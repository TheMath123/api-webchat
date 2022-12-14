import 'dotenv/config';
import express from 'express';
import cors, { CorsOptions } from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { router } from './routers/router';

const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 5555;
const app = express();

app.use(cors());
app.use(router);

app.get('/', (req, res) => {
  res.send('HELLO WORLD!');
});

const corsOptions: CorsOptions = {
  origin: process.env.URL_APP || '*',
  allowedHeaders: '*',
  methods: '*', // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions,
  connectTimeout: 300,
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

  socket.on('connect_error', err => {
    console.log(`connect_error due to ${err.message}`);
  });
});

httpServer.listen(port, host, () => {
  console.info(`API is running in http://${host}:${port}`);
});
