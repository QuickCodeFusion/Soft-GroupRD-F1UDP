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
  
  if(!lapDataPacket || !participantsPacket) return;
  
  // Extract driver data from participants packet
  participantsPacket.m_participants.forEach(participant => {
    if(participant.m_aiControlled === 1) return;
    const driverId = participant.m_networkId;
    console.log('Driver ID:', driverId);
    
    const driverName = participant.m_showOnlineNames ? 
    participant.m_name 
    : `Jugador ${driverId !== 255 ? driverId : 'IA'}`;
    driversDictionary[driverId] = driverName;
  });

  // Associate driver names with lap data
  lapDataPacket?.m_lapData?.forEach((lapData) => {
    const carPosition = lapData.m_carPosition;

    if(carPosition < 1 || carPosition > 20) return;
    
    const driver = participantsPacket.m_participants[carPosition - 1];

      const driverName = driversDictionary[driver.m_networkId];

      if (driverName) {
        // eslint-disable-next-line no-console
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
  ); 

  return driversData;
};

export { relateLapDataToDriver };
