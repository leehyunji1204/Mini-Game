"use strict";

import { Field, ItemType } from "./field.js";
import * as sound from "./sound.js";

export const Reason = Object.freeze({
  win: "win",
  lose: "lose",
  cancel: "cencel",
});

//Builder Pattern
export class GameBuilder {
  gameDuration(duration) {
    this.gameDuration = duration;
    return this;
  }

  carroutCount(num) {
    this.carroutCount = num;
    return this;
  }

  bugCount(num) {
    this.bugCount = num;
    return this;
  }
  build() {
    return new Game(
      this.gameDuration, //
      this.carroutCount,
      this.bugCount
    );
  }
}

class Game {
  constructor(gameDuring, carroutCount, bugCount) {
    this.gameDuring = gameDuring;
    this.carroutCount = carroutCount;
    this.bugCount = bugCount;

    this.gameBtn = document.querySelector(".game__button");
    this.gameTimer = document.querySelector(".game__timer");
    this.gameScore = document.querySelector(".game__score");
    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop(Reason.cancel);
      } else {
        this.start();
      }
    });

    this.gameField = new Field(this.carroutCount, this.bugCount);
    this.gameField.setClickListener((item) => this.onItemClick(item));

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }

  stop(reason) {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButtion();
    sound.stopBackgrounSound();
    this.onGameStop && this.onGameStop(reason);
  }

  onItemClick(item) {
    if (!this.started) return;
    if (item === ItemType.carrout) {
      this.score++;
      this.updateScoreBoard();
      if (this.score === this.carroutCount) {
        this.stop(Reason.win);
      }
    } else if (item === ItemType.bug) {
      this.stop(Reason.lose);
    }
  }

  showStopButton() {
    const icon = this.gameBtn.querySelector(".fas");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButtion() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  startGameTimer() {
    let remainingTimeSec = this.gameDuring;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(this.timer);
        this.stop(this.carroutCount === this.score ? Reason.win : Reason.lose);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimerText(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    this.gameTimer.innerHTML = `${minutes} : ${seconds}`;
  }

  initGame() {
    this.score = 0;
    this.gameScore.innerHTML = this.carroutCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerHTML = this.carroutCount - this.score;
  }
}
