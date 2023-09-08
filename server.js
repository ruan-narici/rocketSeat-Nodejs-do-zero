// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//     res.write('Oi');
//     res.end();
// })

// // ex: localhost:3333
// server.listen(3333);

import { fastify } from 'fastify';
import { DatabaseMemory } from './database-memory.js';

const server = fastify();
const databaseMemory = new DatabaseMemory();

server.post('/videos', (req, res) => {

    const {title, description, duration} = req.body;

    databaseMemory.create({
        title,
        description,
        duration
    });

    return res.status(201).send();
});

server.get('/videos', (req, res) => {

    const search = req.query.search;

    const videos = databaseMemory.list(search);
    return res.send(videos);
});

server.put('/videos/:id', (req, res) => {
    const videoId = req.params.id;

    const {title, description, duration} = req.body;

    databaseMemory.update(videoId, {
        title,
        description,
        duration
    });

    return res.status(204).send();
});

server.delete('/videos/:id', (req, res) => {

    const videoId = req.params.id;

    databaseMemory.delete(videoId);

    return res.status(204).send();
});

server.listen({
    port: 3333,
});

