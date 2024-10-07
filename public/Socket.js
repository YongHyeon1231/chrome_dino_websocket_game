import { CLIENT_VERSION } from './Constants.js';

let userId = '';
let scoreInstance = null;

const socket = io('http://yonghyeon.store:3000/', {
  query: {
    clientVersion: CLIENT_VERSION,
    userId,
  },
});

socket.on('response', (data) => {
  console.log(data);
});

// 서버에서 'connection' 통신을 보낼 때
socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
  if( scoreInstance && data.highScore) {
    scoreInstance.setHighScore(data.highScore.score);
  }
});

// 최고 점수 갱신
socket.on ('newHighScore', (data) => {
  console.log(`highScore: ${data.uuid}, score: ${data.score}`);

  if( scoreInstance && data.score) {
    scoreInstance.setHighScore(data.score);
  }
})

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

// 싱글톤으로 instance에는 score가 객체로 들어가 점수 저장해두기 index.js에서 호출중
const setScoreInstance = (instance) => {
    scoreInstance = instance;
}

export { sendEvent, setScoreInstance };
