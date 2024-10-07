import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { loadGameAssets } from './init/assets.js';
import redisClient from './init/redis.js';
import cors from 'cors';

const app = express();
const server = createServer(app);

const PORT = 3000;

const corsOptions = {
    origin: 'http://yonghyeon.store'
}

app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
initSocket(server)

app.get('/', (req, res) => {
    res.send('<h1>나야 나</h1>');
})

server.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);

    try {
        // 이 곳에서 파일 읽음
        const assets = await loadGameAssets();
        console.log('Assets loaded successfully')
        await redisClient.connect().then();
    } catch (error) {
        console.error('Failed to load game assets:', error);
    }
})