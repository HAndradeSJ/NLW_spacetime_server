// importação do prisma 
import {PrismaClient} from "@prisma/client"

// Exportação da instacia do prisma 
export const Prisma  = new PrismaClient({
        log: ['query'],
});