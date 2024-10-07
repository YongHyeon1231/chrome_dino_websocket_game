import redisClient from "../init/redis.js";

const redisCli = redisClient.v4;

const HIGH_SCORE_KEY = 'high_score';

// // 최고 점수 추가
// export const addHighScore = async(uuid, score) => {
//     await redisCli.ZADD(HIGH_SCORE_KEY, score, JSON.stringify(uuid));
// }

// // 최고 점수 조회
// export const getHighScore = async (limit = 10) => {
//     const scores = await redisCli.ZRANGE(HIGH_SCORE_KEY, 0, limit - 1, 'WITHSCORES');
//     return scores.map((value, index, array) => {
//         if (index % 2 === 0) {
//             return { user: JSON.parse(value), score: parseInt(array[index + 1], 10)};
//         }
//         return null;
//     })
//     .filter((value) => value !== null);
// }

// 다 만들고 보니 scoreModel을 만들지 않고 했으면 더 좋았겠다라는 생각이 들었습니다.
// 최고 점수를 redis에 저장하고 최고 Rank 점수 불러오기
export const scoreModel = {
    addHighScore: async(uuid, score) => {
        console.log("ZADD => ", JSON.stringify(uuid), score);
        //await redisCli.ZADD(HIGH_SCORE_KEY, score, JSON.stringify(uuid));
        await redisCli.ZADD(HIGH_SCORE_KEY, {score, value: JSON.stringify(uuid)});
    },
    getRankWithScore : async () => {
        // 가장 문제가 되었던 부분 sendCommand를 몰라서 WITHSCORES가 작동을 하지 않았다. 즉 key값만 나오고 value값이 나오질 않았다.
        const scores = await redisCli.sendCommand(["ZREVRANGE", HIGH_SCORE_KEY, "0", "-1", "WITHSCORES"]);
        console.log("GETHIGHSCORES=> ", scores)
        
        return scores.map((value, index, array) => {
            if (index % 2 === 0) {
                return { user: JSON.parse(value), score: parseInt(array[index + 1])};
            }
            return null;
        })
        .filter((value) => value !== null);
    }
}