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
    sector1TimeMinutes: number;
    sector2TimeInMS: number;
    sector2TimeMinutes: number;
    deltaToCarInFrontInMS: number;
    deltaToRaceLeaderInMS: number;
    lapDistance: number;
    totalDistance: number;
    safetyCarDelta: number;
    carPosition: number;
    currentLapNum: number;
    pitStatus: number;
    numPitStops: number;
    sector: number;
    currentLapInvalid: number;
    penalties: number;
    totalWarnings: number;
    driverStatus: number;
    resultStatus: number;
    gridPosition: number;
    pitStopShouldServePen: number;
    pitStopTimerInMS: number;
    pitLaneTimeInLaneInMS: number;
    pitLaneTimerActive: number;
    numUnservedStopGoPens: number;
    numUnservedDriveThroughPens: number;
    cornerCuttingWarnings: number;
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