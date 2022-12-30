import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlbumInterface } from 'src/app/interfaces';
import { GameService } from '../../services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() album!: AlbumInterface;
  @Input() gameOver!: boolean;

  isCorrect: boolean = false;

  constructor( private gameService: GameService ) {}

  onSubmit(cardInput: string) {
    if(cardInput.toUpperCase() === this.album.name.toUpperCase()) {
      this.isCorrect = true;
      this.gameService.onGameScore();
    }
  }
}
