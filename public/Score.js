import { sendEvent } from "./Socket.js";

class Score {
  score = 0;
  scoreIncrement = 0;
  highScore = 0;
  currentStage = 1000;
  stageChanged = {};

  constructor(ctx, scaleRatio, stageTable, itemTable, itemController) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
    this.stageTable = stageTable; // 외부에서 전달된 스테이지 데이블 사용
    this.itemTable = itemTable;
    this.itemController = itemController;

    // 모든 스테이지에 대해 stageChanged 초기화
    this.stageTable.forEach((stage) => {
      this.stageChanged[stage.id] = false;
    })
  }

  // 스테이지 변경 체크
  update(deltaTime) {
    const currentStageInfo = this.stageTable.find((stage) => stage.id === this.currentStage);
    const scorePerSecond = currentStageInfo ? currentStageInfo.scorePerSecond : 1;

    // 증가분을 누적
    // 결국 1초동안 scorePerSecond만큼 증가
    this.scoreIncrement += deltaTime * 0.001 * scorePerSecond;

    // 증가분이 scorePerSecond 만큼 쌓이면 score에 반영하고 초기화
    if (this.scoreIncrement >= scorePerSecond) {
      this.score += scorePerSecond;
      this.scoreIncrement -= scorePerSecond;
    }

    // 여기에 조건문이 있으면 불필요한 연산을 줄일 수 있을탠데 흠...
    // 현재 점수와 다음 stage score를 비교하려고해도 결국 그 연산이 그 연산 같아서 보류
    this.checkStageChange();
  }

  checkStageChange() {
    for (let i = 0; i < this.stageTable.length; i++) {
      const stage = this.stageTable[i];

      // 현재 점수가 스테이지 점수 이상이고, 해당 스테이지로 변경된 적이 없는 경우
      if (Math.floor(this.score) >= stage.score && !this.stageChanged[stage.id] && stage.id != 1000) {
        const previousStage = this.currentStage;
        this.currentStage = stage.id;

        // 해당 스테이지를 변경됨으로 표시
        this.stageChanged[stage.id] = true;

        // 서버로 이벤트 전송
        sendEvent(11, {currentStage: previousStage, targetStage: this.currentStage});

        // 아이템 컨트롤러에 현재 스테이지 설정
        if (this.itemController) {
          this.itemController.setCurrentStage(this.currentStage);
        }

        // 스테이지 변경 후 반복문 종료
        break;
      }
    }
  }

  getItem(itemId) {
    const itemInfo = this.itemTable.find((item) => item.id === itemId);
    if (itemInfo) {
      this.score += itemInfo.score;
      sendEvent(21, { itemId, timestamp: Date.now()});
    }
  }

  reset() {
    this.score = 0;
    this.scoreIncrement = 0;
    this.currentStage = 1000;

    Object.keys(this.stageChanged).forEach((key) => {
      this.stageChanged[key] = false;
    })

    if (this.itemController) {
      this.itemController.setCurrentStage(this.currentStage);
    }
  }

  setHighScore(score) {
    console.log("SETHIGHSCORE => ", score);
    this.highScore = score;
  }

  getScore() {
    return this.score;
  }

  draw() {
    // const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = this.highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);

    // 스테이지 화면에 직접 그려주기
    this.drawStage();
  }

  drawStage() {
    const stageY = 50 * this.scaleRatio;
    const fontSize = 30 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const stageText = `Stage ${this.currentStage - 999}`;
    const stageX = this.canvas.width / 2 - this.ctx.measureText(stageText).width / 2;

    this.ctx.fillText(stageText, stageX, stageY)
  }
}

export default Score;
