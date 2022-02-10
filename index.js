"use strict";
//reference: https://www.fastify.io/docs/latest/Reference/TypeScript/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
// import json schemas as normal
const querystring_json_1 = __importDefault(require("./schemas/querystring.json"));
const querystring_json_2 = __importDefault(require("./schemas/querystring.json"));
// setup server
const server = (0, fastify_1.default)();
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(0);
    }
    console.log(`Server listening at ${address}`);
});
//define new API route
server.get('/auth', {
    schema: {
        querystring: querystring_json_1.default,
        headers: querystring_json_2.default
    },
    //add preValidation hook
    preValidation: (request, reply, done) => {
        const { username } = request.query;
        done(username !== 'admin' ? new Error('Must be admin') : undefined); // only validate admin account
    }
    //  or if using async
    //  preValidation: async (request, reply) => {
    //    const { username, password } = request.query
    //    return username !== "admin" ? new Error("Must be admin") : undefined;
    //  }
}, async (request, reply) => {
    const { username } = request.query;
    const customerHeader = request.headers['h-Custom'];
    // do something with request data
    return `logged in!`;
});
server.route({
    method: 'GET',
    url: '/auth2',
    schema: {
        querystring: querystring_json_1.default,
        headers: querystring_json_2.default
    },
    preHandler: (request, reply, done) => {
        const { username } = request.query;
        const customerHeader = request.headers['h-Custom'];
        done();
    },
    handler: (request, reply) => {
        const { username } = request.query;
        const customerHeader = request.headers['h-Custom'];
        reply.status(200).send({ username });
    }
});
