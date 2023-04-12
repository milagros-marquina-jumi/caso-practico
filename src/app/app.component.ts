import { Component, OnInit } from '@angular/core';
import { Bird } from './models/Bird';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cantHouses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  birds: Bird[] = []
  scoreRosa: number = 0;
  scoreAzul: number = 0;
  maxBird: number = 9;
  time: number = 0;
  previousRandom: number = 0;
  gameOver: Boolean = false;

  constructor() { }

  ngOnInit(): void {
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
  }

  fnCleanBirds() {
    for (let i = 0; i < this.birds.length; i++) {
      this.birds[i].visibility = false;
    }
  }

  fnGenerateRandom(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  fnInitialize() {
    this.scoreRosa = 0;
    this.scoreAzul = 0;
    this.time = 60;
    this.gameOver = true;
    this.previousRandom = 0;
    this.fnCreateBirds();
  }

  fnDecreaseTime() {
    this.time--;

    if (this.time < 0) {
      this.gameOver = false;
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
