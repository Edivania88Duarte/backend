import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from 'zod';
import { prisma } from "../lib/prisma";
import { ClientError } from "../erros/client-error";


export async function getParticipant(app: FastifyInstance) {
    app.withTypeProvider<ZodTypeProvider>().get(
        '/participants/:participantId', 
        {
        schema: {
            params: z.object({
                participantId: z.string().uuid(),
            }),        
        },
    }, 
    async (request) => {
        const { participantId } = request.params
       
        const participant = await prisma.participant.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                s_confirmed: true,
            },
            where: { id: participantId },
          
        
     
        })
        
        if (!participant) {
            throw new ClientError('Participant not found')
        }

       

        return { participant }
        
     },
    
    )
    
}