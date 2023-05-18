// importações 
import fastify from 'fastify';
import { memoriesroutes } from './routes/memories';

// variavel padrão
const app = fastify();


// Rota
app.register(memoriesroutes)

// Porta padrão
app.listen({
    port: 3333
}).then(()=>{
    console.log("server rodando na porta 3333")
})

