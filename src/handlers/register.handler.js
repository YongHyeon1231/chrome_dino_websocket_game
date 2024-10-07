import { v4 as uuidv4 } from 'uuid';
import { userModel } from '../models/user.model.js';
import { handleConnection, handleDisconnect, handleEvent } from './helper.js';


// io.on은 Socket.IO 서버에서 전체 연결에 대한 이벤트를 처리할 때 사용
// socket.on은 개별 소켓에서 특정 이벤트를 처리할 때 사용
// const registerHandler = (io) => {
//     io.on('connection', async (socket) => {
//         // 최초 커넥션을 맺은 이후 발생하는 각종 이벤트를 처리하는 곳

//         // 유저를 처음 등록하는 시점
//         // const userUUID = '1234';
//         const userUUID = uuidv4();
//         await userModel.addUser({uuid: userUUID, socketId: socket.id });

//         // 접속시 유저 정보 생성 이벤트 처리
//         await handleConnection(socket, userUUID);
        
//         // 모든 서비스 이벤트 처리
//         socket.on('event', (data) => handleEvent(io, socket, data));

//         // 유저 접속 해제시 이벤트
//         socket.on('disconnect', (socket) => handleDisconnect(socket, userUUID));
//     })
// }

// export default registerHandler;


const registerHandler = (io) => {
    io.on('connection', async (socket) => {
        // 최초 커넥션을 맺은 이후 발생하는 각종 이벤트를 처리하는 곳

        // 유저를 처음 등록하는 시점
        // const userUUID = '1234';
        let user = {};
        if (socket.handshake.query.userId) {
            user = await userModel.getUserById(socket.userId);

            if (!user) {
                user = {};
                user.uuid = socket.handshake.query.userId;
            }
            user.socketId = socket.id;
        } else {
            user.uuid = uuidv4();
            user.socketId = socket.id;
        }
        await userModel.addUser(user);

        // 접속시 유저 정보 생성 이벤트 처리
        await handleConnection(socket, user.uuid);
        
        // 모든 서비스 이벤트 처리
        socket.on('event', (data) => handleEvent(io, socket, data));

        // 유저 접속 해제시 이벤트
        socket.on('disconnect', (socket) => handleDisconnect(socket, user.uuid));
    })
}

export default registerHandler;