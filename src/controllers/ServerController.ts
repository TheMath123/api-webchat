import { CorsOptions } from 'cors';
import 'dotenv/config';
import session from 'express-session';

const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  name: 'sid',
  store: null,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production' ? true : 'auto',
    httpOnly: true,
    expires: new Date(2554685773),
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  },
});

const wrap = expressMiddleware => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

const corsOptions: CorsOptions = {
  origin: process.env.URL_APP || '*',
  allowedHeaders: '*',
  methods: '*', // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

export { sessionMiddleware, wrap, corsOptions };
