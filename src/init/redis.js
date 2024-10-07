import redis from 'redis';
// import dotenv from 'dotenv';

// dotenv.config();

const redisClient = redis.createClient({
  url: 'redis://localhost:6379',
  legacyMode: true,
});

redisClient.on('connect', () => {
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  console.log('Redis client error: ', err);
});

export default redisClient;
