// Importação
import { FastifyInstance } from "fastify"
import { Prisma } from "../lib/prisma";
import {z} from 'zod';
import axios from 'axios'

// rota de autenticação
export default function UploadRoutes (app:FastifyInstance){
    app.post('/upload', async (Request)=>{
            // pegando o arquivi da requisição
            const upload = await Request.file({
                limits:{
                    fileSize:5242880
                }
            })
            // vereficar se a imagem
            if(!upload){
                return reply.status(400).send()
            }
            upload
    })
   
    
}