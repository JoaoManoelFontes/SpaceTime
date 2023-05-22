/* eslint-disable prettier/prettier */
import { FastifyInstance } from 'fastify'
import {prisma} from '../lib/prisma'
import {z} from 'zod'


export async function memoriesRouter(app: FastifyInstance) {
    app.addHook('preHandler', async (request) => {
        await request.jwtVerify()
    })

    app.get('/memories', async (request) => {
        const memories = await prisma.memory.findMany({
            where:{
                userId: request.user.sub,
            },
            orderBy: {createdAt: 'asc'}
        })
        return memories.map((memory) => {
            return {
            id: memory.id,
            title: memory.title,
            excerpt: memory.content.length>100 ? memory.content.substring(0, 100) + '...' : memory.content,
            media: memory.media,
            createdAt: memory.createdAt,
            }
        })
    })

    app.get('/memory/:id', async (request, reply) => {
        const paramSchema = z.object({ 
            id: z.string().uuid(),
        })
        const {id} = paramSchema.parse(request.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {id},
        })
        
        if(memory.userId !== request.user.sub && !memory.isPublic ) {
                return reply.status(401).send()
        }

        return memory
    })

    app.post('/memories', async (request) => {
        const bodySchema = z.object({
            content: z.string().min(1).max(1000),
            isPublic: z.coerce.boolean().default(false),
            title: z.string().min(1).max(50),
            media: z.string()
        })

        const {content, isPublic, title, media} = bodySchema.parse(request.body)

        const memory = await prisma.memory.create({
            data: {
                content,
                isPublic,
                title,
                media,
                userId: request.user.sub,
            },
        })

        return memory

    })

    app.put('/memory/:id', async (request, reply) => {
        const paramSchema = z.object({
            id: z.string().uuid(),
        })
        const {id} = paramSchema.parse(request.params)

        const bodySchema = z.object({
            content: z.string().min(1).max(1000),
            isPublic: z.coerce.boolean().default(false),
            title: z.string().min(1).max(50),
            media: z.string()
        })

        const {content, isPublic, title, media} = bodySchema.parse(request.body)

        let memory = await prisma.memory.findUniqueOrThrow({
            where: {id},
        })

        if(memory.userId !== request.user.sub) {
            return reply.status(401).send()
        }

        memory = await prisma.memory.update({
            where: {id},
            data: {
                content,
                isPublic,
                title,
                media,
            },
        })

        return memory
    })

    app.delete('/memories/:id', async (request, reply) => {
         const paramSchema = z.object({
            id: z.string().uuid(),
        })
        const {id} = paramSchema.parse(request.params)

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {id},
        })

        if(memory.userId !== request.user.sub) {
            return reply.status(401).send()
        }

        await prisma.memory.delete({
            where: {id},
        })
        
        
    })
}
