import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import server from './server';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { F123UDP } from 'f1-23-udp';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

export const f123Client = new F123UDP({
  port: 20777,
  address: 'localhost',
});

export const io = new Server(http.createServer(server), {
  cors: {
    origin: '*',
  },
});

/* eslint-disable no-console */
io.on('connection', (socket: Socket) => {
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


f123Client.on('lapData', () => { console.log('ENTRE');});

f123Client.on('carStatus', () => { console.log('ENTRE');});

f123Client.on('participants', () => { console.log('ENTRE');});

f123Client.on('session', () => { console.log('ENTRE');});

f123Client.on('carTelemetry', () => { console.log('ENTRE');});

f123Client.on('carDamage', () => { console.log('ENTRE');});

f123Client.on('lobbyInfo', () => { console.log('ENTRE');});

f123Client.on('finalClassification', () => { console.log('ENTRE');});

f123Client.on('event', () => { console.log('ENTRE');});

f123Client.start();


server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
