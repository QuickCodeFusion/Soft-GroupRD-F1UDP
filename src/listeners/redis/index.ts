import { createClient } from 'redis';

const redisClient = createClient({
  password: 'YQ30iBh1KqxZS1tBEvmqVLvs5968Y37M',
  socket: {
    host: 'redis-11248.c331.us-west1-1.gce.redns.redis-cloud.com',
    port: 11248,
  },
});

redisClient.connect();

redisClient.on('error', (err) => console.log('Redis Client Error', err));

export default redisClient;
