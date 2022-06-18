import express from 'express';
const PORT = 5000;
const server = express();
server.use(express.json());

server.listen(5000, () => console.log('listening on port ' + PORT));