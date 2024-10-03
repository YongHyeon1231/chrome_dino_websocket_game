

const users = [];

// 서버 메모리에 유정의 세션(소켓ID)를 저장
// 이때 유저는 객체 형태로 저장
// { uuid: string, socketId: string }

// export const addUser = (user) => {
//     users.push(user);
// };

// // 배열에서 유저 삭제
// // 접속해제 한 경우에는 서버메모리에서 유저를 삭제
// export const removeUser = (socketId) => {
//     const index = users.findIndex((user) => user.socketId === socketId);
//     if (index !== -1) {
//         return users.splice(index, 1)[0];
//     }
// }

// // 전체 유저 조회
// export const getUsers = () => {
//     return users;
// }

export const userModel = {
    addUser: (user) => {
        users.push(user);
    },
    removeUser: (socketId) => {
        const index = users.findIndex((user) => user.socketId === socketId);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    },
    getUsers: () => {
        return users;
    }
}