// importações 
import fastify from 'fastify';
import { memoriesroutes } from './routes/memories';
import  Multipart from '@fastify/multipart';
import jwt from '@fastify/jwt'
import cors from '@fastify/cors'
import auth from './routes/auth';
import 'dotenv/config';
import UploadRoutes from './routes/upload';
import fastifyStatic from '@fastify/static';
import { resolve } from 'path';

// Registros 
const app = fastify();

//registrando o multipart
app.register(Multipart)
app.register(fastifyStatic,{
    root:resolve(__dirname,'../uploads'),
    prefix:'/uploads',
})

app.register(cors,{
    origin :[true] //todos os enderçoes podem editar 
})
app.register(jwt,{
    // codigo chave do token
    secret:'spacetime',
})


// Rota
app.register(auth);
app.register(UploadRoutes)
app.register(memoriesroutes); 


// Porta padrão
app.listen({
    port: 3333,
    host: '0.0.0.0'
}).then(()=>{
    console.log("server rodando na porta 3333")
})

