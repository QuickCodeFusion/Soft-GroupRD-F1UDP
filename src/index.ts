import './pre-start'; // Must be the first import
import logger from 'jet-logger';

import EnvVars from '@src/constants/EnvVars';
import app from './server';
import { Server, Socket } from 'socket.io';
import http from 'http';
import { F123UDP } from 'f1-23-udp';
import { ParticipantsListener } from './listeners/io/Participants';
import jsonParser from 'socket.io-json-parser';
import { lapDataListener } from './listeners/f123Client/lapData';
import { finalClassificationListener } from './listeners/f123Client/finalClassification';
import { relateLapDataToDriver } from './util/raceData';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

const server = http.createServer(app);

export const f123Client = new F123UDP({
  port: 20777,
  address: 'localhost',
});

export const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001'],
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

f123Client.on('lapData', (lapData) => {
  f123Client.on('participants', (participants) => {
    const participantsPosition = relateLapDataToDriver(lapData, participants);
    io.emit('participantsPosition', participantsPosition);
  });
});

f123Client.on('finalClassification', (data) => { finalClassificationListener(io, data);});

f123Client.start();


server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
