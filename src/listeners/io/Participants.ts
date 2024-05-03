import EnvVars from '@src/constants/EnvVars';
import { NodeEnvs } from '@src/constants/misc';
import { PacketParticipantsData, ParticipantData } from 'f1-23-udp';
import { Server } from 'socket.io';
import { NormalizedParticipantData, NormalizedParticipantsData } from './types/F123UDP';

export const ParticipantsListener = (
  io: Server,
  data: PacketParticipantsData | undefined) => {
  if (data) {
    const normalizedData: NormalizedParticipantsData = {
      numParticipants: data.m_numActiveCars,
      participants: data.m_participants.map((participant: ParticipantData) => {
        return {
          aiControlled: participant.m_aiControlled,
          driverId: participant.m_driverId,
          networkId: participant.m_networkId,
          teamId: participant.m_teamId,
          myTeam: participant.m_myTeam,
          raceNumber: participant.m_raceNumber,
          nationality: participant.m_nationalty,
          name: participant.m_name,
          platform: participant.m_platform,
        } as NormalizedParticipantData;
      }),
    };
    io.emit('Participants', normalizedData);
    if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
      // eslint-disable-next-line no-console
      console.log('Participants', normalizedData);
    }
  }
  else {
    throw new Error('Invalid data: ' + data);
  }
};