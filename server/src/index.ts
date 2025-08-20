import Fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyFormbody from '@fastify/formbody';
import dotenv from 'dotenv';
import { apiRoute } from './routes/v1Route.ts';

dotenv.config();

const app = Fastify({ logger: true });

const PORT = Number(process.env.PORT) || 3000;

app.register(cors, {
  origin: [`${process.env.URI}`], // 🔐 Replace with your real domain
});

app.register(fastifyFormbody);

app.get('/', async (request, reply) => {
  reply.type('application/json').code(200);
  return { hello: 'world' };
});

app.register(apiRoute, { prefix: '/api' });

app.setNotFoundHandler((request, reply) => {
  reply.status(404).send({ error: 'Not Found' });
});

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});
