import redisClient from '../init/redis.js';

const redisCli = redisClient.v4;

const USER_KEY_PREFIX = 'user:';

export const userModel = {
  addUser: async (user) => {
    await redisCli.set(`${USER_KEY_PREFIX}${user.uuid}`, JSON.stringify(user));
  },
  removeUser: async (uuid) => {
    const userKey = `${USER_KEY_PREFIX}${uuid}`;
    const user = await redisCli.get(userKey);
    if (user) {
      await redisCli.del(userKey);
      return JSON.parse(user);
    }
    return null;
  },
  getUserById: async (uuid) => {
    const user = await redisCli.get(`${USER_KEY_PREFIX}${uuid}`);
    return user ? JSON.parse(user) : null;
  },
  getUsers: async () => {
    const keys = await redisCli.keys(`${USER_KEY_PREFIX}*`);
    const users = [];
    for (const key of keys) {
      const user = await redisCli.get(key);
      if (user) {
        users.push(JSON.parse(user));
      }
    }
    return users;
  },
};

// const users = [];

// export const userModel = {
//     addUser: (user) => {
//         users.push(user);
//     },
//     removeUser: (socketId) => {
//         const index = users.findIndex((user) => user.socketId === socketId);
//     if (index !== -1) {
//         return users.splice(index, 1)[0];
//     }
//     },
//     getUsers: () => {
//         return users;
//     }
// }
