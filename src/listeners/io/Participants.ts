import EnvVars from '@src/constants/EnvVars';
import { NodeEnvs } from '@src/constants/misc';
import { PacketParticipantsData } from 'f1-23-udp';
import { Socket } from 'socket.io';

export const ParticipantsListener = (io: Socket, data: PacketParticipantsData) => {
  io.emit('Participants', data);
  if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
    // eslint-disable-next-line no-console
    console.log('Participants', data);
  }
};