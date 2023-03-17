import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { corsOptions, wrap } from './controllers/ServerController';
import { router } from './routers/router';

const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT) || 5555;
const app = express();

app.use(cors());
app.use(router);

app.get('/', (req, res) => {
  res.send('Procure o Easter Egg');
});

app.use(express.static('public'));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  path: '/chat-connection/',
  cors: corsOptions,
  transports: ['websocket'],
});

io.on('connection', socket => {
  console.log('[IO] Connection - New socket connect', socket.id);

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
