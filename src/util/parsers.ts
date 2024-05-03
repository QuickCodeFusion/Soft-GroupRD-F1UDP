import { NormalizedFinalClassificationData, NormalizedLapData } from '@src/listeners/f123Client/types/F123Client';
import { PacketFinalClassificationData, PacketLapData } from 'f1-23-udp';

export function parseLapStatusPacketFunc(packet: PacketLapData): NormalizedLapData[] {

  const normalizedLapData: NormalizedLapData[] = packet.m_lapData.map((lapData) => {

    return {
      'carPosition': lapData.m_carPosition,
      'currentLapNum': lapData.m_currentLapNum,
      'currentLapTimeInMS': lapData.m_currentLapTimeInMS,
      'lastLapTimeInMS': lapData.m_lastLapTimeInMS,
      'lapDistance': lapData.m_lapDistance,
      'numPitStops': lapData.m_numPitStops,
      'penalties': lapData.m_penalties,
      'sector': lapData.m_sector,
      'sector1TimeInMS': lapData.m_sector1TimeInMS,
      'sector2TimeInMS': lapData.m_sector2TimeInMS,
      'totalWarnings': lapData.m_totalWarnings,
    } as NormalizedLapData;
  });

  return normalizedLapData;

}

export function parseFinalClassificationDataFunc(packet: PacketFinalClassificationData):
 NormalizedFinalClassificationData[] {

  const NormalizedFinalClassificationData = packet.m_classificationData.map(
    (classificationData) => {
      return {
        'bestLapTimeInMS': classificationData.m_bestLapTimeInMS,
        'gridPosition': classificationData.m_gridPosition,
        'numLaps': classificationData.m_numLaps,
        'points': classificationData.m_points,
        'position': classificationData.m_position,
        'resultStatus': classificationData.m_resultStatus,
        'totalRaceTime': classificationData.m_totalRaceTime,
        'penaltiesTime': classificationData.m_penaltiesTime,
        'numPenalties': classificationData.m_numPenalties,
        'numPitStops': classificationData.m_numPitStops,
      } as NormalizedFinalClassificationData;
    },
  );

  return NormalizedFinalClassificationData;

}
