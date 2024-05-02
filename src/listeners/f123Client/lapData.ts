import { parseLapStatusPacketFunc } from '@src/util/parsers';
import { NormalizedLapDataPacket } from './types/F123Client';
import { Server } from 'socket.io';
import { PacketLapData } from 'f1-23-udp';

export const lapDataListener = (io: Server, data: PacketLapData | undefined) => {
  if(data) {
    const packet =  parseLapStatusPacketFunc(data);

    const normalizedLapData: NormalizedLapDataPacket = {
      lapData: packet,
      timeTrialPBCarIdx: data.m_timeTrialPBCarIdx,
      timeTrialRivalCarIdx: data.m_timeTrialRivalCarIdx,
    };

    io.emit('lapData', normalizedLapData);
  }
  else{
    throw new Error('Invalid data: ' + data);
  }
};