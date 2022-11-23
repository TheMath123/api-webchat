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
    origin: process.env.URL_APP || '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  },
});

io.on('connection', socket => {
  console.log('[IO] Connection - New socket connect', socket.id);

  socket.on('chat.message', data => {
    console.log(`[SOCKET] chat.message - data: `, data);
    io.emit('chat.message', data);
  });

  socket.on('disconnect', () => {
    console.log(`[IO] Disconnect -  Socket disconnect ${socket.id}`);
  });
});

httpServer.listen(port, host, () => {
  console.info(`API is running in http://${host}:${port}`);
});
