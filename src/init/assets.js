import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// import.meta.url는 현재 assets.js의 절대경로를 나타냅니다. 
// chrome_dino_websocket_game/src/init/assets.js
const __filename = fileURLToPath(import.meta.url);
// 파일 이름 빼고 디렉터리 경로만 찾아냅니다. 
// chrome_dino_websocket_game/src/init
const __dirname = path.dirname(__filename);
// 디렉토리 경로에서 뒤로 두칸 그리고 assets라는 폴더를 찾는다.
// 최상위 경로 + assets 폴더
const basePath = path.join(__dirname, '../../assets')

let gameAssets = {};

// 비동기 병렬로 파일을 읽는다.
const readFileASync = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(JSON.parse(data));
        })
    })
}

// Promise.all()
// 파일을 비동기로 한번에 읽어줄 함수 <- app.js에서 쓰기 위해
export const loadGameAssets = async () => {
    try {
        const [stages, items, itemUnlocks] = await Promise.all([
            readFileASync('stage.json'),
            readFileASync('item.json'),
            readFileASync('item_unlock.json'),
        ]);
        gameAssets = { stages, items, itemUnlocks };
        return gameAssets;
    } catch(error) {
        // throw를 하면 상위 함수로 간다.
        // 즉, app.js에서 loadGameAssets을 부르는 함수로 간다.
        throw new Error('Failed to load game assets: ' + error.message);
    }
}

export const getGameAssets = () => {
    return gameAssets;
};