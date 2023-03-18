import 'dotenv/config';
import session from 'express-session';

const { URL_APP, COOKIE_SECRET } = process.env;

const sessionMiddleware = session({
  secret: `${COOKIE_SECRET}`,
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

const corsOptions = {
  origin: `${URL_APP}`,
  methods: ['GET', 'POST'], // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export { sessionMiddleware, wrap, corsOptions };
