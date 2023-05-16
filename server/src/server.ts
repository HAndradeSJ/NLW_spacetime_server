// importações 
import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
// variavel padrão
const app = fastify();
const Prisma = new PrismaClient()
// Rotas
app.get("/users", async ()=>{
    const users  = await Prisma.user.findMany();
    return users 
})

// Porta padrão
app.listen({
    port: 3333
}).then(()=>{
    console.log("server rodando na porta 3333")
})

