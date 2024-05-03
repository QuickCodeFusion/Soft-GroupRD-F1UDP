import { PacketFinalClassificationData, type PacketLapData } from 'f1-23-udp';

export type NormalizedLapDataPacket = {
    lapData: NormalizedLapData[];
    timeTrialPBCarIdx: PacketLapData['m_timeTrialPBCarIdx'];
    timeTrialRivalCarIdx: PacketLapData['m_timeTrialRivalCarIdx'];
}

export type NormalizedLapData = {
    lastLapTimeInMS: number;
    currentLapTimeInMS: number;
    sector1TimeInMS: number;
    sector2TimeInMS: number;
    lapDistance: number;
    carPosition: number;
    currentLapNum: number;
    numPitStops: number;
    sector: number;
    penalties: number;
    totalWarnings: number;
}

export type NormalizedFinalClassificationDataPacket = {
    finalClassificationData: NormalizedFinalClassificationData[];
    m_numCars: PacketFinalClassificationData['m_numCars'];
}

export type NormalizedFinalClassificationData = {
    position: number;
    numLaps: number;
    gridPosition: number;
    points: number;
    numPitStops: number;
    resultStatus: number;
    bestLapTimeInMS: number;
    totalRaceTime: number;
    penaltiesTime: number;
    numPenalties: number;
}