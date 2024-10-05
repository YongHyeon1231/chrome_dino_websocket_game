import { stageModel } from "../models/stage.model.js";
import { getGameAssets } from "../init/assets.js";
import { itemMoel } from "../models/item.model.js";
import { calculateTotalScore } from "../utils/calculateTotalScore.js";

export const gameStart = (uuid, payload) => {
    // 서버 메모리에 있는 게임 에셋에서 stage 정보를 가지고 온다.
    const {stages} = getGameAssets();

    stageModel.clearStage(uuid);
    itemMoel.initUserItem(uuid);
    // stages 배열에서 0번째 = 첫번째스테이지의 ID를 해당 유저의 stage에 저장한다.
    stageModel.setStage(uuid, stages.data[0].id, payload.timestamp);
    // 로그를 찍어 확인
    console.log('Stage: ', uuid, stageModel.getStage(uuid));

    return {status: 'success', handlerId: 2};
}

export const gameEnd = (uuid, payload) => {
    // 클라이언트에서 받은 게임 종료 시 타임스탬프와 총 점수
    const { timestamp: gameEndTime, score } = payload;
    const stages = stageModel.getStage(uuid);
    const userItems = itemMoel.getUserItems(uuid);

    if (!stages.length) {
        return { status: 'fail', message: 'No stages found for user'};
    }

    // 총 점수 계산
    const totalScore = calculateTotalScore(stages, gameEndTime, false, userItems);

    // 점수와 타임스탬프 검증 (예: 클라이언트가 보낸 총점과 계산된 총점 비교)
    // 오차범위 5
    if (Math.abs(score - totalScore) > 5) {
        return { status: 'fail', message: 'Score verification failed' };
    }

    // 현재 최고 점수를 가져와서 비교
    // todo...

    // 모든 검증이 통과된 후, 클라이언트에서 제공한 점수 저장하는 로직
    // saveGameResult(userId, clientScore, gameEndTime);
    // 검증이 통과되면 게임 종료 처리
    return {status: 'success', message: 'Game ended successfully', score, handlerId: 3};
}