import { NormalizedParticipantData } from '@src/listeners/io/types/F123UDP';
import { PacketLapData, PacketParticipantsData, ParticipantData } from 'f1-23-udp';

interface ParticipantPosition extends NormalizedParticipantData {
    position: number;
    gridPosition: number;
    time: number;
}

let drivers: ParticipantData[] = [];

const relateLapDataToDriver = (
  lapDataPacket: PacketLapData,
  participantsPacket: PacketParticipantsData) => {
  const driversData: ParticipantPosition[] = [];

  const driversDictionary: Record<number, string> = {};
  
  if(!lapDataPacket || !participantsPacket) return;
  
    if(drivers.length === 0) drivers = participantsPacket.m_participants;
  // Extract driver data from participants packet
  // participantsPacket.m_participants.forEach(participant => {
  //   if(participant.m_aiControlled === 1) return;
  //   const driverId = participant.m_networkId;
  //   // console.log('Driver ID:', driverId);
    
  //   const driverName = participant.m_showOnlineNames ? 
  //   participant.m_name 
  //   : `Jugador ${driverId !== 255 ? driverId : 'IA'}`;
  //   driversDictionary[driverId] = driverName;
  // });

  // Associate driver names with lap data
  lapDataPacket?.m_lapData?.forEach((lapData) => {
    const gridPosition = lapData.m_gridPosition;

    if(gridPosition < 1 || gridPosition > 20) return;
    
    const driver = drivers[gridPosition - 1];

    // const driverName = driversDictionary[driver.m_networkId];

        // eslint-disable-next-line no-console
        driversData.push({
          name: driver.m_name || `Jugador ${driver.m_networkId !== 255 ? driver.m_networkId : 'IA'}`,
          aiControlled: driver.m_aiControlled,
          driverId: driver.m_driverId,
          networkId: driver.m_networkId,
          myTeam: driver.m_myTeam,
          raceNumber: driver.m_raceNumber,
          platform: driver.m_platform,
          position: lapData.m_carPosition,
          gridPosition,
          teamId: driver.m_teamId,
          nationality: driver.m_nationalty,
          time: lapData.m_sector1TimeInMS
        });
      }

  ); 

  return driversData;
};

export { relateLapDataToDriver };
