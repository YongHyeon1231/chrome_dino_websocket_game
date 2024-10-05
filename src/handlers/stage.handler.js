import { getGameAssets } from "../init/assets.js";
import { itemMoel } from "../models/item.model.js";
import { stageModel } from "../models/stage.model.js";
import { calculateTotalScore } from "../utils/calculateTotalScore.js";


// 스테이지 이동 핸들러
export const moveStageHandler = (userId, payload) => {
    // 유저의 현재 스테이지 배열을 가져오고, 최대 스테이지 ID를 찾는다.
    let currentStages = stageModel.getStage(userId);
    console.log("currentStage => ", currentStages);
    if (!currentStages.length) {
        return { status: 'fail', message: 'No stages found for user'};
    }

    // 오름차순 정렬 후 가장 큰 스테이지 ID 확인
    currentStages.sort((a,b) => a.id - b.id);
    const currentStage = currentStages[currentStages.length - 1];

    // payload 의 currentStage 와 비교
    if (currentStage.id !== payload.currentStage) {
        return { status: 'fail', message: 'Current stage mismatch'};
    }

    // 게임 에셋에서 다음 스테이지의 존재 여부 확인
    const { stages } = getGameAssets();

    // 현재 스테이지의 정보를 stageTable에서 가져옴
    const currentStageInfo = stages.data.find((stage) => stage.id === payload.currentStage);
    if (!currentStageInfo) {
        return { status: 'fail', message: 'Current stage info not found' };
    }

    // 타겟 스테이지의 정보를 stageTable에서 가져옴
    const targetStageInfo = stages.data.find((stage) => stage.id === payload.targetStage);
    if (!targetStageInfo) {
        return { status: 'fail', message: 'Target stage info not found' };
    }

    // 점수 검증
    const serverTime = Date.now();
    const userItems = itemMoel.getUserItems(userId);
    const totalScore = calculateTotalScore(currentStage, serverTime, true, userItems);
    
    if (targetStageInfo.score > totalScore) {
        return { status: 'fail', message: 'Invalid compare targetStageInfo score and totalScore'};
    }

    // 유저의 스테이지 정보 업데이트
    stageModel.setStage(userId, payload.targetStage, serverTime);

    return {status: 'success', handlerId: 11};
};