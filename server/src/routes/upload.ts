// Importação
import { FastifyInstance } from "fastify"
import {randomUUID} from 'node:crypto'
import { createWriteStream } from "node:fs"
import {extname, resolve} from 'node:path'  
import { pipeline } from "node:stream"
import { promisify } from "node:util"


const pump = promisify(pipeline)

// rota de autenticação
export default function UploadRoutes (app:FastifyInstance){
    app.post('/upload', async (request,reply)=>{
            // pegando o arquivi da requisição
            const upload = await request.file({
                limits:{
                    fileSize:5242880
                }
            })
            // vereficar se a imagem
            if(!upload){
                return reply.status(400).send()
            }
            const mimetype = /^(imagem|video)\/[a-zA-Z]+/
            const isvalidad = mimetype.test(upload.mimetype)
            if(!isvalidad){
                return reply.status(400).send()
            }

        // gerando um id da imagem 
        const fileid = randomUUID()
        // renomeando a imagem para não subistituir
        const extesion = extname(upload.filename)
        const Filename = fileid.concat(extesion)

        // criando um streamm 
        const writeStream = createWriteStream(
            resolve(__dirname,'../../uploads/',Filename)
        )
        await pump(upload.file, writeStream)

        // criando um url para imagem
        const fullurl = request.protocol.concat('://').concat(request.hostname)
        const fileurl = new URL(`/uploads/${Filename}`,fullurl).toString()
        return {ok:true}
    })
   
    
}

