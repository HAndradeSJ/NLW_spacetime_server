// importações
import {FastifyInstance} from 'fastify'
import { Prisma } from '../lib/prisma';
import {z} from 'zod'

export async function memoriesroutes(app:FastifyInstance){
    // FUNÇÃO QUE FAZ ANTES DE EXCUTAR CADA UM DAS ROTAS    
   app.addHook('preHandler', async (request)=>{    
        //função para validação de ação
        await request.jwtVerify()
   })
    
    // listar todas as memories
    app.get("/memories", async (request)=>{
      
       

       const memories =  await  Prisma.Memory.findMany({
            where:{
                userId: request.user.sub
            },
            orderBy:{
                createdAT:'asc',
            },
       })
       return memories.map((memory: { id: any; coverUrl: any; content: string; }) =>{
            return {
                id:memory.id,
                coverUrl: memory.coverUrl,
                expect: memory.content.substring(0,155).concat('...'),
            }
       })
    })


    // buscar todas as memories por id
    app.get("/memories/:id", async (request:any, reply:any)=>{
        // Validação do zod para ver se o id é um stirng
        const parmsSchema = z.object({
            id: z.string().uuid()
        })
        const {id} = parmsSchema.parse(request.params);
        
        const memory = await Prisma.Memory.findUniqueOrThrow({
            where: {
                id,
            },
        })
        // validação para não alterar algo que não é seu 
        if(!memory.isPublic && memory.userId != request.user.sub){
            return reply.status(401).send()
        }
        return memory

    })


    // cadastrar uma memorie
    app.post("/memories", async (request:any)=>{
        // metodo de validação dos campos
        const BodySchema = z.object({
            content :z.string(),
            coverUrl: z.string(),
            isPublic:z.coerce.boolean().default(false),
        })
        // desconstrução do objeto
        const {content, isPublic, coverUrl} = BodySchema.parse(request.body)
       
        const memory = await Prisma.Memory.create({
            data:{
                content,
                coverUrl,
                isPublic,
                userId: request.user.sub,
            }
        })
        return memory
    })


    // modificar uma memorie
    app.put("/memories/:id", async (request:any,reply:any)=>{
            //validação do id  do corpo
            const parmsSchema = z.object({
                id: z.string().uuid()
            })
            const {id} = parmsSchema.parse(request.params);

          //validar o corpo da req
          const BodySchema = z.object({
            content :z.string(),
            coverUrl: z.string(),
            isPublic:z.coerce.boolean().default(false),
        })
        // descontrução do objeto
        const {content, isPublic, coverUrl} = BodySchema.parse(request.body)

        let memory = await Prisma.Memory.findUniqueOrThrow({
            where:{
                id
            }
        })

        if (memory.userId !== request.user.sub){
            return reply.status(401).send()
        }

        await Prisma.Memory.update({
            where:{
                id
            },
            data:{
                content,
                isPublic,
                coverUrl
            }
        })
       
    })


    // deletar uma memorie
    app.delete("/memories/:id", async (request:any,reply:any)=>{
         // Validação do zod para ver se o id é um stirng
         const parmsSchema = z.object({
            id: z.string().uuid()
        })
        const {id} = parmsSchema.parse(request.params);

        //função que valida se o usario que está logado é o mesmo usuari do token
        const memory = await Prisma.Memory.findUniqueOrThrow({
            where:{
                id
            }
        })
        
        if (memory.userId !== request.user.sub){
            return reply.status(401).send()
        }
        
         await Prisma.Memory.delete({
            where: {
                id,
            },
        })
    })

}