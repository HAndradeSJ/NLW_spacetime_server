// importações 
import fastify from 'fastify';
import { memoriesroutes } from './routes/memories';
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import auth from './routes/auth';
import 'dotenv/config';

// Registros 
const app = fastify();
app.register(cors,{
    origin :[true] //todos os enderçoes podem editar 
})
app.register(jwt,{
    // codigo chave do token
    secret:'spacetime',
})

// Rota
app.register(auth);
app.register(memoriesroutes); 


// Porta padrão
app.listen({
    port: 3333,
    host: '0.0.0.0',
}).then(()=>{
    console.log("server rodando na porta 3333")
})

