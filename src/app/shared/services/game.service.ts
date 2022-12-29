import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GameInterface } from 'src/app/interfaces';

@Injectable()
export class GameService {
  timeLeft: number = 60;

  score: number = 0;
  total: number = 0;

  constructor() { }

  setTime(total: number): number {
    const extraTime = total - 10;
    if(extraTime > 0) {
      return this.timeLeft += extraTime*6;
    }

    return this.timeLeft;
  }

  onGameStart(total: number): Observable<GameInterface> {
    this.total = total;
    this.timeLeft = this.setTime(this.total);

    return new Observable((observer) => {
      if(this.timeLeft > 0 && this.score < this.total) {
        this.timeLeft--;
        observer.next({
          message: 'Time is runing',
          timeLeft: this.timeLeft,
          score: this.score,
        })
      } else  {
        observer.next(this.onGameOver())
      }
    })
  }

  onGameOver(): GameInterface {
    if(this.score === this.total) {
      return {
        message: 'Congratulations! You won.',
        timeLeft: this.timeLeft,
        score: this.score,
        gameOver: true
      }
    } else if ((this.score - this.total) >= 3) {
      return {
        message: 'To close! You lose.',
        timeLeft: this.timeLeft,
        score: this.score,
        gameOver: true
      }
    } else {
      return {
        message: 'Maybe, next time! You lose.',
        timeLeft: this.timeLeft,
        score: this.score,
        gameOver: true
      }
    }
  }

  onGameScore(): void {
    this.score++;
  }
}
