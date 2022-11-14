import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { router } from './routers/router';
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 5555;
const app = express();

app.use(router);

app.get('/', (req, res) => {
  res.send();
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});
io.sockets.emit('hi', 'everyone');

io.engine.on('connection_error', err => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

io.on('connection', socket => {
  console.log(`Connection ${socket.id}`);
});

httpServer.listen(port, host, () => {
  console.log(`API is running in http://${host}:${port}`);
});
