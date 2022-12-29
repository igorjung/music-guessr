import { Component } from '@angular/core';
import { ModalService, SearchService } from '../../services';
import { ArtistInterface } from '../../../interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  list: ArtistInterface[] | [] = [];

  isErrorVisible: boolean = false;
  message: string = '';

  constructor(
    private searchService: SearchService,
    private modalService: ModalService
  ) {}

  onSearch(value: string) {
    this.searchService.searchItem(value).subscribe({
      next: (res) => { this.list = res.artists.items || []; },
      error: (err) => {
        console.log(err);
        this.modalService.onOpen({
          isOpen: true,
          title: 'An error occurred',
          message: 'message',
          label: 'Close',
        });
      }
    })
  }
}
