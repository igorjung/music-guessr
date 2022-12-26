import { Component } from '@angular/core';
import { SearchService } from '../../services';
import { ArtistInterface } from '../../../interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  list: ArtistInterface[] | [] = [];

  constructor( private searchService: SearchService ) {}

  onSearch(value: string) {
    this.searchService.searchItem(value).subscribe({
      next: (res) => { this.list = res.artists.items || []; },
      error: (err) => console.log(err)
    })
  }

}
