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
            orderBy: {date: 'asc'}
        })
        return memories.map((memory) => {
            return {
            id: memory.id,
            title: memory.title,
            excerpt: memory.content.length>50 ? memory.content.substring(0, 50) + '...' : memory.content,
            media: memory.media,
            date: memory.date
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
            media: z.string(),
            date: z.string(),
        })

        const {content, isPublic, title, media, date} = bodySchema.parse(request.body)        
        
        const memory = await prisma.memory.create({
            data: {
                content,
                isPublic,
                title,
                media,
                date,
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
            media: z.string(),
            date: z.string(),
        })

        const {content, isPublic, title, media, date} = bodySchema.parse(request.body)

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
                date,
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

    app.get('/memories/public/:userLogin', async (request) => {

        const paramsSchema = z.object({
            userLogin: z.string().min(1),
        })

        const {userLogin} = paramsSchema.parse(request.params)

        const memories = await prisma.memory.findMany({
            where:{
                user: {
                    login: userLogin
                },
                isPublic: true,
            },
            orderBy: {date: 'asc'}
        })

        return memories.map((memory) => {
            return {
            id: memory.id,
            title: memory.title,
            excerpt: memory.content.length>50 ? memory.content.substring(0, 50) + '...' : memory.content,
            content: memory.content,
            media: memory.media,
            date: memory.date,
            }
        })
    })
}
