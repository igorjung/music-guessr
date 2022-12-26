import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlbumInterface } from 'src/app/interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  @Input() album!: AlbumInterface;
  @Input() gameOver!: boolean;
  @Output() onStatusUpdate = new EventEmitter<string>();

  isCorrect: boolean = false;

  onSubmit(cardInput: string) {
    if(cardInput.toUpperCase() === this.album.name.toUpperCase()) {
      this.isCorrect = true;
      this.onStatusUpdate.emit('IS_CORRECT');
    }
  }
}
