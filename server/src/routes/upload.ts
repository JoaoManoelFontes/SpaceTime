/* eslint-disable prettier/prettier */

import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'fs'
import { extname, resolve } from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

const pump = promisify(pipeline)

// file types accepted: images and videos
const typeRegex = /^(image|video)\/[a-zA-Z]+/




export async function UploadRouter(app: FastifyInstance) {

    app.post('/upload', async (request, response) => {
        const file  = await request.file({
            limits: {
                fileSize: 1024 * 1024 * 5, // 5mb
            }
        })
        
        
        if(!file) {
            return response.status(400).send()
        }
        


        if(!typeRegex.test(file.mimetype)) {
            return response.status(400).send()
        }   

        const filename = `${randomUUID()}${extname(file.filename)}`
        const writeStream = createWriteStream(
            resolve(__dirname, '..', '..', 'uploads', filename)
        )

        await pump(file.file, writeStream)

        const url = `${request.protocol}://${request.hostname}/uploads/${filename}`
        
        return response.status(201).send(url)
        })

}
