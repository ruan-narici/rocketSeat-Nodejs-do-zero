// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//     res.write('Oi');
//     res.end();
// })

// // ex: localhost:3333
// server.listen(3333);

import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
// const databaseMemory = new DatabaseMemory();
const databasePostgres = new DatabasePostgres();

server.post('/videos', async (req, res) => {

    const {title, description, duration} = req.body;

    await databasePostgres.create({
        title,
        description,
        duration
    });

    return res.status(201).send();
});

server.get('/videos', async (req, res) => {

    const search = req.query.search;

    const videos = await databasePostgres.list(search);
    return res.send(videos);
});

server.put('/videos/:id', async (req, res) => {
    const videoId = req.params.id;

    const {title, description, duration} = req.body;

    await databasePostgres.update(videoId, {
        title,
        description,
        duration
    });

    return res.status(204).send();
});

server.delete('/videos/:id', async (req, res) => {

    const videoId = req.params.id;

    await databasePostgres.delete(videoId);

    return res.status(204).send();
});

server.listen({
    port: process.env.PORT ?? 3333,
});

