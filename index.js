"use strict";
//reference: https://www.fastify.io/docs/latest/Reference/TypeScript/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
//define schema as an object
const todo = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        done: { type: 'boolean' },
    },
    required: ['name'],
};
//build type from schema and use it in handler
const f = (0, fastify_1.default)();
f.post('/todo', {
    schema: {
        body: todo,
        response: {
            201: {
                type: 'string',
            },
        },
    }
}, async (request, reply) => {
    /*
    request.body has type
    {
      [x: string]: unknown;
      description?: string;
      done?: boolean;
      name: string;
    }
    */
    request.body.name; // will not throw type error
    request.body.notthere; // will throw type error
    reply.status(201).send();
});
//setup server
const server = (0, fastify_1.default)();
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
