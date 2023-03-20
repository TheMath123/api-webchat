import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { corsOptions, sessionMiddleware, wrap } from './config/serverOptions';
import { router } from './routers/router';

const host = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT) || 5555;
const app = express();

app.use(cors());
app.use(router);

app.get('/', (req, res) => {
  res.send('Procure o Easter Egg');
});

app.use(sessionMiddleware);
app.use(express.static('public'));

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: '/chat-connection/',
  cors: corsOptions,
  transports: ['websocket'],
});

io.use(wrap(sessionMiddleware));

io.on('connection', socket => {
  console.log(`[IO] Disconnect -  Socket disconnect ${socket.id}`);

  // Send and recieve messages
  socket.on('chat.message', data => {
    console.log(`[SOCKET] chat.message - data: `, data);
    io.emit('chat.message', data);
  });

  socket.on('chat.connect', data => {
    console.log(`[SOCKET] chat.connect - data: `, data.message);
    io.emit('chat.connect', data);
  });

  socket.on('chat.disconnect', data => {
    console.log(`[SOCKET] chat.disconnect - data: `, data.message);
    io.emit('chat.disconnect', data);
  });

  // Disconnect information
  socket.on('disconnect', data => {
    console.log(`[IO] Disconnect -  Socket disconnect ${data}`);
  });

  // Error information
  socket.on('connect_error', err => {
    console.log(`connect_error due to ${err.message}`);
  });
});

httpServer.listen(port, host, () => {
  console.info(`API is running in http://${host}:${port}`);
});
