import Fastify from 'fastify';
import  cors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import dotenv from "dotenv";
import { json } from 'stream/consumers';
dotenv.config()
import { apiRoute } from './routes/v1Route.ts';

const app = Fastify({logger:true});
const PORT = Number (process.env.PORT);

app.register(cors,{
  "origin": `${process.env.URI}`
})
app.register(fastifyFormbody)


app.get('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'world' }
})
 app.register(apiRoute, {prefix:'/api'});

 app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`Server listening on ${address}`);
    });