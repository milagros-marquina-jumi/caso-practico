import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  cantHouses = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  scoreRosa: number = 0;
  scoreAzul: number = 0;
  time: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.fnInicializar();
    this.iniciarTemporizador();
  }

  fnInicializar() {
    this.scoreRosa = 0;
    this.scoreAzul = 0;
    this.time = 60;
  }

  fnDisminuirTiempo() {
    this.time--;
  }

  iniciarTemporizador() {
    let t = window.setInterval(() => {
      if (this.time <= 0) {
        this.fnDisminuirTiempo();
        clearInterval(t);
      } else {
        this.fnDisminuirTiempo();
      }
    }, 1000)
  }
}
