//reference: https://www.fastify.io/docs/latest/Reference/TypeScript/

import fastify from "fastify";
import { FromSchema} from "json-schema-to-ts";

//define schema as an object

const todo = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        done: { type: 'boolean' },
    },
    required: ['name'],
} as const;

//build type from schema and use it in handler
const f = fastify();
f.post<{ Body: FromSchema<typeof todo> }>(
    '/todo',
    {
        schema: {
            body: todo,
            response: {
                201: {
                    type: 'string',
                },
            },
        }
    },
    async (request: any, reply: any): Promise<void> => {

        /*
        request.body has type
        {
          [x: string]: unknown;
          description?: string;
          done?: boolean;
          name: string;
        }
        */

        request.body.name // will not throw type error
        request.body.notthere // will throw type error

        reply.status(201).send();
    },
);

//setup server
const server = fastify();

server.listen(8080, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

