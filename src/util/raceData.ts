import { PacketLapData, PacketParticipantsData } from "f1-23-udp";

export function relateLapDataToDriver(lapDataPacket: PacketLapData, participantsPacket: PacketParticipantsData): void {
    const driverData: { [driverId: number]: string } = {};

    // Extract driver data from participants packet
    participantsPacket.m_participants.forEach(participant => {
        if(participant.m_aiControlled === 1) return;
        const driverId = participant.m_networkId;
        const driverName = participant.m_showOnlineNames === 0 ? 'Unknown' : participant.m_name;
        driverData[driverId] = driverName;
    });

    // Associate driver names with lap data
    lapDataPacket.m_lapData.forEach((lapData, index) => {
        const carPosition = lapData.m_carPosition;
        
        if (carPosition > 0 && carPosition <= participantsPacket.m_participants.length) {
            const driverId = participantsPacket.m_participants[carPosition - 1].m_networkId;
            
            const driverName = driverData[driverId];

            if (driverName) {
                console.log(`Driver: ${driverId}, Lap Position: ${index + 1}`);
            }
        }
    });

    
    
}
