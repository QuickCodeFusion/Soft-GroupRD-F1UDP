import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import { Server } from 'socket.io';
import http from 'http';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

export const io = new Server(http.createServer(server), {
  cors: {
    origin: '*',
  },
});

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
