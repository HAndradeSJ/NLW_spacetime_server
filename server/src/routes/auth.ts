// Importação
import { FastifyInstance } from "fastify"
import { Prisma } from "../lib/prisma";
import {z} from 'zod';
import axios from 'axios'

// rota de autenticação
export default function auth (app:FastifyInstance){
    app.post('/register', async (request) =>{

        // validação do codigo de verifição
        const bodySchema = z.object({
            code: z.string()
        })
        const {code} = bodySchema.parse(request.body);

        // usar o axios para comunicar com a  api do github
        const accessTokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            null,
            {
                params:{
                
                    client_id: process.env.GITHUB_CLIENTE_ID,
                    client_secret: process.env.GITHUB_CLIENTE_SECRET,
                    code,
                },
                headers:{
                    Accept:'application/json'
                }
            }
        )
        // Obtendo o access_tocken
        const {access_tocken} = accessTokenResponse.data; 

        //fazendo uma requisição dos dados do github do usuario
        const userResponse = await axios.get('https://api.github.com/user',{
            headers :{
                Authorization: `Bearer ${access_tocken}`,
            },
        })
        
        //validação dos dados do usuario
        const userSchema = z.object({
            id: z.number(),
            login: z.string(),
            name: z.string(),
            avatar_url: z.string().url(),
        })

        // criando a variavel do usuario
        const userInfo = userSchema.parse(userResponse.data)

        // cadastrando o usuario no prisma 
        let user = await Prisma.user.findUnique({
            where:{
                githubId: userInfo.id,
            }
        })
        if (!user) {
            user = await Prisma.user.create({
                data:{
                    githubId: userInfo.id,
                    login: userInfo.login,
                    name: userInfo.name,
                    avatar_url: userInfo.avatar_url
                },
            })
        }

        // Gerando o  jwt anotar no notin 
        const token = app.Jwt.sign({
            //quais são as informações do usaario que vai estar no token/ publica nn sensivel
            name: user.name,
            avatarUrl : user.avatar_url
        },{
            // a qual usuario pertence a esse token 
            sub: user.id,
            //quanto tempo o token vai expirar 
            expiresIn: '30 days'
        })
        

        return{
           token
        }
    })

}