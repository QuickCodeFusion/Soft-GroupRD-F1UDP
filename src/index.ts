import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import app from './server';
import { Server, Socket } from 'socket.io';
import http from 'http';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

const server = http.createServer(app);


export const io = new Server(server, {
  cors: {
    origin: EnvVars.Origins,
  },
});

/* eslint-disable no-console */
io.on('connection', (socket: Socket) => {
  console.log('✅ Client connected: ', socket.id);
  socket.on('EventProject', () => { console.log('ENTRE');});
  socket.on('Participants', () => { console.log('ENTRE');});
  socket.on('SendPosition', () => { console.log('ENTRE');});
  socket.on('FinalClassification', () => { console.log('ENTRE');});
},
);

io.on('disconnect', (socket: Socket) => {
  // eslint-disable-next-line no-console
  console.log('❌ Client disconnected: ', socket.id);
});

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
