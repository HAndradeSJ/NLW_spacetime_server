// importações 
import fastify from 'fastify';
import { memoriesroutes } from './routes/memories';
import cors from '@fastify/cors'

// variavel padrão
const app = fastify();
app.register(cors,{
    origin :[true] //todos os enderçoes podem editar 
})

// Rota
app.register(memoriesroutes)

// Porta padrão
app.listen({
    port: 3333
}).then(()=>{
    console.log("server rodando na porta 3333")
})

