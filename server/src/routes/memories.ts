// importações
import {FastifyInstance} from 'fastify'
import { Prisma } from '../lib/prisma';
import {z} from 'zod'

export async function memoriesroutes(app:FastifyInstance){
    
    // listar todas as memories
    app.get("/memories", async ()=>{
       const memories =  await  Prisma.Memory.findMany({
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
    app.get("/memories/:id", async (request:any)=>{
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
                userId: '6e891df7-d5d7-4c8f-af0e-f721546f8200',
            }
        })
        return memory
    })


    // modificar uma memorie
    app.put("/memories/:id", async (request:any)=>{
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
    app.delete("/memories/:id", async (request:any)=>{
         // Validação do zod para ver se o id é um stirng
         const parmsSchema = z.object({
            id: z.string().uuid()
        })
        const {id} = parmsSchema.parse(request.params);
        
        const memory = await Prisma.Memory.delete({
            where: {
                id,
            },
        })
    })

}