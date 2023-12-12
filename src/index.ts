import express from 'express';
import http from 'http';
import otherMiddleWare from './middlewares/others';
import routeMiddleWware from './middlewares/route';
import databaseMiddleWare from './middlewares/database';

const app = express();

const port = process.env.PORT || 8000;

otherMiddleWare(app);
routeMiddleWware(app);
databaseMiddleWare();

export const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
