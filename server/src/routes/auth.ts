/* eslint-disable prettier/prettier */

import { FastifyInstance } from 'fastify'
import axios from 'axios'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function AuthRouter(app: FastifyInstance) {

    app.post('/auth', async (request) => {
        const bodySchema = z.object({
            code: z.string()
        })

        const { code } = bodySchema.parse(request.body)

        const { data: tokenData } = await axios.post('https://github.com/login/oauth/access_token', null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            }, 
            headers: {
                Accept: 'application/json'
            }
        }) 

        const { data: userData } = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${tokenData.access_token}`
            }
        })

        const {id, login, avatar_url, name} = userData

        let user = await prisma.user.findUnique({
            where: {
                gitHubId: id
            }
        })

        if(!user) {
            user = await prisma.user.create({
                data: {
                    login,
                    name,
                    gitHubId: id,
                    avatar: avatar_url,
                }
            })
        }

        return {
            token: app.jwt.sign({
                name: user.name,
                avatar: user.avatar,
            },{
                sub: user.id,
                expiresIn: '24h'
            })
        }
    })
}
