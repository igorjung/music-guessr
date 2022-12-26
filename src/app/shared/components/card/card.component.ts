import { Component, Input } from '@angular/core';
import { ArtistInterface } from 'src/app/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() artist!: ArtistInterface;
}
