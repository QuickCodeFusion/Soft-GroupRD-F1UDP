import { parseLapStatusPacketFunc } from '@src/util/parsers';
import { NormalizedLapDataPacket } from './types/F123Client';
import { Server } from 'socket.io';
import { PacketLapData } from 'f1-23-udp';
import EnvVars from '@src/constants/EnvVars';
import { NodeEnvs } from '@src/constants/misc';

export const lapDataListener = (io: Server, data: PacketLapData | undefined) => {
  if(data) {
    const packet = parseLapStatusPacketFunc(data);

    const normalizedLapData: NormalizedLapDataPacket = {
      lapData: packet,
      timeTrialPBCarIdx: data.m_timeTrialPBCarIdx,
      timeTrialRivalCarIdx: data.m_timeTrialRivalCarIdx,
    };

    io.emit('lapData', normalizedLapData);

    if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
      // eslint-disable-next-line no-console
      console.log('lapData', normalizedLapData);
    }
  }
  else{
    throw new Error('Invalid data: ' + data);
  }
};