import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameInterface } from 'src/app/interfaces';

@Injectable()
export class GameService {
  timer!: ReturnType<typeof setInterval>;

  gameInfo = new BehaviorSubject<GameInterface>({
    message: '',
    timeLeft: 60,
    score: 0,
    total: 0,
    isRunning: false,
    isOver: false,
  });
  gameInfo$ = this.gameInfo.asObservable();
  onGameNewChange(gameInfo: GameInterface) {
    this.gameInfo.next(gameInfo);
  }

  constructor() { }

  onGameConfig(total: number): void {
    const { timeLeft } = this.gameInfo.value;
    const extraTime = (total - 10)*6;

    this.onGameNewChange({
      message: 'Game is ready to start!',
      timeLeft: extraTime > 0 ? timeLeft + extraTime : timeLeft,
      score: 0,
      total,
      isRunning: false,
      isOver: false,
    });
  }

  onGameStart(): void {
    this.onGameNewChange({
      ...this.gameInfo.value,
      isRunning: true,
    });
  }

  onGameRunning(): Observable<GameInterface> {
    return new Observable((observer) => {
      this.gameInfo$.subscribe({ next: (game) => {
        console.log('!!!!', game);

        if(game.isRunning) {
          let { timeLeft, score, total } = game;

          this.timer = setInterval(() => {
            if(timeLeft && score < total) {
              timeLeft--;
              observer.next({
                ...game,
                timeLeft
              });
            } else {
              clearInterval(this.timer);
              observer.next({
                ...game,
                message: this.onGameOver(game),
                isRunning: false,
                isOver: true,
              });
            }
          }, 1000);
        } else {
          observer.next(game);
        }
      }})
    });
  }

  onGameOver(game: GameInterface): string {
    const { total, score } = game;

    const scoreDifference = total - score;
    let message = 'Maybe, next time! You lose.';
    clearInterval(this.timer);

    if(!scoreDifference) {
      message = 'Congratulations! You won.';
    } else if (scoreDifference < 3) {
      message = 'To close! You lose.';
    }

    return message;
  }

  onGameScore(): void {
    const { score } = this.gameInfo.value;

    this.onGameNewChange({
      ...this.gameInfo.value,
      score: score + 1,
    });
  }
}
