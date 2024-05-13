import { Repository } from 'redis-om';
import { participantSchema } from './Participant';
import redisClient from '@src/listeners/redis';

const participantRepo = new Repository(participantSchema, redisClient);

export { participantRepo };
