"use strict";
//reference: https://www.fastify.io/docs/latest/Reference/TypeScript/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
//1. setup server
const server = (0, fastify_1.default)();
server.get('/ping', async (request, reply) => {
    return 'pong\n';
});
server.listen(8080, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
//define new API route
server.get('/auth', {
    //add preValidation hook
    preValidation: (request, reply, done) => {
        const { username, password } = request.query;
        done(username !== 'admin' ? new Error('Must be admin') : undefined); // only validate admin account
    }
}, async (request, reply) => {
    const { username, password } = request.query;
    const customerHeader = request.headers['h-Custom'];
    // do something with request data
    return `logged in!`;
});
