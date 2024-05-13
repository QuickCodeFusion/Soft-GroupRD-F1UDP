import { Schema } from 'redis-om';

export const participant = 'participant';

export const participantSchema = new Schema(participant, {
  name: { type: 'string' },
  aiControlled: { type: 'boolean' },
  driverId: { type: 'number' },
  networkId: { type: 'number' },
  teamId: { type: 'number' },
  myTeam: { type: 'boolean' },
  raceNumber: { type: 'number' },
  nationality: { type: 'number' },
  platform: { type: 'number' },
});
