import { getGameAssets } from "../init/assets.js";
import { stageModel } from "../models/stage.model.js";
import { userModel } from "../models/user.model.js"


export const handleDisconnect = (socket, uuid) => {
    userModel.removeUser(socket.id);
    console.log(`User disconnected: ${socket.id}`);
    console.log('Current Users: ', userModel.getUsers());
}

export const handleConnection = (socket, uuid) => {
    console.log(`New user connected: ${uuid} with socket ID ${socket.id}`);
    console.log('Current users: ', userModel.getUsers());

    // 서버 메모리에 있는 게임 에셋에서 stage 정보를 가지고 온다.
    const {stages} = getGameAssets();
    // stages 배열에서 0번째 = 첫번째스테이지의 ID를 해당 유저의 stage에 저장한다.
    stageModel.createStage(uuid, stages.data[0].id);
    // 로그를 찍어 확인
    console.log(uuid, stages.data[0].id);

    // emit 메서드로 해당 유저에게 메시지를 전달할 수 있다.
    // 현재의 경우 접속하고 나서 생성된 uuid를 바로 전달해주고 있다.
    socket.emit('connection', {uuid: uuid})
}