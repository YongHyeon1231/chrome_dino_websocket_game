import { gameEnd, gameStart } from "./game.handler.js";
import { moveStageHandler } from "./stage.handler.js";
import { itemPickupHandler } from "./item.handler.js";


const handlerMapplings = {
    2: gameStart,
    3: gameEnd,
    11: moveStageHandler,
    21: itemPickupHandler,
}

export default handlerMapplings;