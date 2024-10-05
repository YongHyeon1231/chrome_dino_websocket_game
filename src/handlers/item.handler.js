import { getGameAssets } from "../init/assets.js"
import { itemMoel } from "../models/item.model.js";
import { stageModel } from "../models/stage.model.js";


export const itemPickupHandler = (userId, payload) => {
    const { items, itemUnlocks } = getGameAssets();
    const { timestamp, itemId } = payload;

    // 아이템 정보 조회
    const item = items.data.find((item) => item.id === itemId);
    if (!item) {
        return { status: 'fail', message: 'Invalid item Id'};
    }

    // 유저의 현재 스테이지 정보 조회
    const currentStages = stageModel.getStage(userId);
    if (!currenStage.length) {
        return { status: 'fail', message: 'No stages found for user'};
    }
    const currentStageId = currentStages[currentStages.length - 1].id;

    // 현재 스테이지에서 나올 수 있는 아이템인지 검증
    const checkItems = itemUnlocks.data.find((stage) => stage.stage_id === currentStageId).item_ids;
    if (!checkItems.includes(itemId)) {
        return { status: 'fail', message: "Item now found in current stage"};
    }

    // 아이템 기록 추가
    itemMoel.addItem(userId, {id: itemId, timestamp});
    return { status: 'success', handlerId: 21};
}