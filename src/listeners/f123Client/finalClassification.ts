import { parseFinalClassificationDataFunc } from '@src/util/parsers';
import { PacketFinalClassificationData } from 'f1-23-udp';
import { Server } from 'socket.io';
import { NormalizedFinalClassificationDataPacket } from './types/F123Client';
import EnvVars from '@src/constants/EnvVars';
import { NodeEnvs } from '@src/constants/misc';

export const finalClassificationListener = (io: Server, 
  data: PacketFinalClassificationData | undefined)  => {
  if(data) {

    const packet =  parseFinalClassificationDataFunc(data);

    const normalizedData: NormalizedFinalClassificationDataPacket = {
      finalClassificationData: packet,
      m_numCars: data.m_numCars,
    };

    io.emit('finalClassification', normalizedData);
    if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
      // eslint-disable-next-line no-console
      console.log('finalClassification', normalizedData);
    }
  }
  else{
    throw new Error('Invalid data: ' + data);
  }
};