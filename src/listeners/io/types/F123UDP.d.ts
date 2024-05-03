import {
  type PacketLapData,
  type PacketParticipantsData,
  type ParticipantData,
} from 'f1-23-udp';

export type NormalizedParticipantData = {
  aiControlled: ParticipantData['m_aiControlled']
  driverId: ParticipantData['m_driverId']
  networkId: ParticipantData['m_networkId']
  teamId: ParticipantData['m_teamId']
  myTeam: ParticipantData['m_myTeam']
  raceNumber: ParticipantData['m_raceNumber']
  nationality: ParticipantData['m_nationalty']
  name: ParticipantData['m_name']
  platform: ParticipantData['m_platform']
}

export type NormalizedParticipantsData = {
    numParticipants: PacketParticipantsData['m_numActiveCars']
    participants: NormalizedParticipantData[]
}

export type NormalizedParticipantsData = {
    header: PacketLapData['m_header']
    lapData: PacketLapData['m_lapData']
    timeTrialPBCar: PacketLapData['m_timeTrialPBCarIdx']
    timeTrialRivalCar: PacketLapData['m_timeTrialRiva']
}
