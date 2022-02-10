//reference: https://www.fastify.io/docs/latest/Reference/TypeScript/

import fastify from "fastify";
import {request} from "https";

//1. setup server
const server = fastify();

server.get('/ping', async (request, reply) => {
    return 'pong\n'
})

server.listen(8080, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

//2. Generics
//define interfaces

interface IQuerystring {
    username: string;
    password: string;
}

interface IHeaders {
    'h-Custom': string;
}

//define new API route
server.get<{
    Querystring: IQuerystring,
    Headers: IHeaders
}>('/auth', {
    //add preValidation hook
    preValidation: (request, reply, done) => {
        const { username, password } = request.query
        done(username!=='admin' ? new Error('Must be admin') : undefined) // only validate admin account
    }

}, async (request, reply) => {
    const { username, password } = request.query
    const customerHeader = request.headers['h-Custom']
    // do something with request data

    return `logged in!`
})