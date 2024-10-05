import { getGameAssets } from "../init/assets.js";

// 지속 시간을 기반으로 총 점수 계산
// (currentStages, serverTime, true, userItems)
export const calculateTotalScore = (stages, gameEndTime, isMoveStage, userItems) => {
    let totalScore = 0;
    
    const { stages: stageData, items: itemData} = getGameAssets();
    const stageTable = stageData.data;

    if(!stageTable) return {status: 'fail', message: 'Not found stage data'};

    stages.forEach((stage, index) => {
        let stageEndTime;
        
        if (index === stages.length -1) {
            // 마지막 스테이지의 경우 종료 시간이 게임의 종료 시간
            stageEndTime = gameEndTime;
        } else {
            // 다음 스테이지의 시작 시간을 현재 스테이지의 종료 시간으로 사용
            stageEndTime = stages[index + 1].timestamp;
        }
        
        let stageDuration = (stageEndTime - stage.timestamp) / 1000;

        const stageInfo = stageTable.find((val) => val.id === stage.id);
        const scorePerSecond = stageInfo ? stageInfo.scorePerSecond : 1;

        if (!isMoveStage && index === stages.length - 1) {
            // 마지막 스테이지의 경우 
            stageDuration = Math.floor(stageDuration);
        } else {
            stageDuration = Math.round(stageDuration);
        }

        totalScore += stageDuration * scorePerSecond;
    })

    // 아이템 획득 점수 추가
    userItems.forEach((userItem) => {
        const item = itemData.data.find((item) => item.id === userItem.id);
        if (item) {
            totalScore += item.score;
        }
    })

    return totalScore;
}