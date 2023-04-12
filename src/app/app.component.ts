import { Component, OnInit } from '@angular/core';
import { Bird } from './models/Bird';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  birds: Bird[] = []
  scorePink: number = 0;
  scoreBlue: number = 0;
  maxBird: number = 9;
  time: number = 0;
  previousRandom: number = 0;
  gameOver: Boolean = true;
  sizeScore: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.fnCreateBirds();
  }

  fnPlay() {
    this.fnInitialize();
    this.startTimer();
  }

  fnCreateBirds() {
    this.birds = [];
    for (let i = 0; i < this.maxBird; i++) {
      const obj = new Bird();
      obj.number = i + 1;
      obj.img = obj.number % 2 == 0 ? 'aveRosa.png' : 'aveAzul.png';
      obj.visibility = false;
      this.birds.push(obj);
    }
  }

  fnGenerateBird() {
    let azar = 0;

    do {
      azar = this.fnGenerateRandom(1, this.maxBird);
    } while (azar == this.previousRandom);

    this.previousRandom = azar;

    for (let i = 0; i < this.birds.length; i++) {
      if (this.birds[i].number == this.previousRandom) {
        this.birds[i].visibility = true;
        break;
      }
    }

    this.fnValidateIncreaseScore();
  }

  fnValidateIncreaseScore() {
    const suma = this.scoreBlue + this.scorePink;

    if (suma % 10 == 0 && suma > 0) {
      this.sizeScore++;
    }
  }

  fnCleanBirds() {
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].visibility = false;
    }
  }

  fnGenerateRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  fnCaptureBird(item: Bird): any {
    if (!this.gameOver) {
      if (item.number! % 2 == 0) {
        this.scorePink++;
      } else {
        this.scoreBlue++;
      }
    }
  }

  fnInitialize() {
    this.scorePink = 0;
    this.scoreBlue = 0;
    this.time = 60;
    this.gameOver = false;
    this.previousRandom = 0;
    this.sizeScore = 16;
    this.fnCreateBirds();
  }

  fnDecreaseTime() {
    this.time--;

    if (this.time <= 0) {

      this.gameOver = true;
    }
  }

  startTimer() {
    let t = window.setInterval(() => {
      if (this.time <= 0) {
        clearInterval(t);
      } else {
        this.fnDecreaseTime();
        this.fnCleanBirds();
        this.fnGenerateBird();
      }
    }, 1000)
  }
}
