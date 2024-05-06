import { NormalizedParticipantData } from '@src/listeners/io/types/F123UDP';
import { PacketLapData, PacketParticipantsData } from 'f1-23-udp';

interface ParticipantPosition extends NormalizedParticipantData {
    position: number;
}

const relateLapDataToDriver = (
  lapDataPacket: PacketLapData,
  participantsPacket: PacketParticipantsData) => {
  const driversData: ParticipantPosition[] = [];

  const driversDictionary: Record<number, string> = {};

  // Extract driver data from participants packet
  participantsPacket.m_participants.forEach(participant => {
    if(participant.m_aiControlled === 1) return;
    const driverId = participant.m_networkId;
    const driverName = participant.m_showOnlineNames ? 
      participant.m_name 
      : `Jugador ${participant.m_networkId}`;
    driversDictionary[driverId] = driverName;
  });

  // Associate driver names with lap data
  lapDataPacket.m_lapData.forEach((lapData) => {
    const carPosition = lapData.m_carPosition;
        
    if (carPosition > 0 && carPosition <= participantsPacket.m_participants.length) {
      const driver = participantsPacket.m_participants[carPosition - 1];
            
      const driverName = driversDictionary[driver.m_driverId];

      if (driverName) {
        // eslint-disable-next-line no-console
        console.log(`Driver: ${driver.m_driverId}, Lap Position: ${carPosition}`);
        driversData.push({
          name: driverName,
          aiControlled: driver.m_aiControlled,
          driverId: driver.m_driverId,
          networkId: driver.m_networkId,
          myTeam: driver.m_myTeam,
          raceNumber: driver.m_raceNumber,
          platform: driver.m_platform,
          position: carPosition,
          teamId: driver.m_teamId,
          nationality: driver.m_nationalty,
        });
      }
    }
  }); 

  return driversData;
};

export { relateLapDataToDriver };
