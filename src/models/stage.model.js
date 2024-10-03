
// 스테이지 정보를 객체에 {key: uuid, value: array}의 형태로 uuid를 Key로 저장합니다.
// value:array 에는 stageId를 가진 객체가 들어갑니다.
const stages = {};

// export const createStage = (uuid) => {
//     stages[uuid] = {};
// }

// export const getStage = (uuid) => {
//     return stages[uuid];
// }

// export const setStage = (uuid, id) => {
//     return stages[uuid].push({id});
// }

export const stageModel = {
    createStage: (uuid) => {
        stages[uuid] = {};
    },
    getStage: (uuid) => {
        return stages[uuid];
    },
    setStage: (uuid, id, timestamp) => {
        return stages[uuid].push({id, timestamp});
    }
}