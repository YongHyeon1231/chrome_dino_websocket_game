
// { userId: {total: score, timestamp: Data.now()}}
const userItems = {};

export const itemMoel = {
    // 게임 시작 시 아이템 기록 초기화
    initUserItem: (userId) => {
        userItems[userId] = [];
    },
    // 아이템 획득 기록
    addItem: (userId, item) => {
        if (!userItems[userId]) {
            userItems[userId] = [];
        }
        userItems[userId].push(item);
    },
    // 유저의 아이템 획득 기록 조회
    getUserItems: (userId) => {
        return userItems[userId] || [];
    },
    // // 점수 관련
    // adduserItemTotal: (userId, score) => {
    //     if(!userItem[userId]?.total) initUserItem(userId);
    //     userItem[userId].total += score;
    // }
}