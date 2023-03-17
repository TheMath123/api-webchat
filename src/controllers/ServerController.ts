import 'dotenv/config';

const { URL_APP } = process.env;

const wrap = expressMiddleware => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

const corsOptions = {
  origin: `${URL_APP}`,
  methods: ['GET', 'POST'], // some legacy browsers (IE11, various SmartTVs) choke on 204
};

export { wrap, corsOptions };
