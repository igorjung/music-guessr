import { Component, Input } from '@angular/core';
import { ModalService, SearchService } from '../../services';
import { ArtistInterface } from '../../../interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  list: ArtistInterface[] | [] = [];
  serachInput!: string;

  isErrorVisible: boolean = false;
  message: string = '';

  constructor(
    private searchService: SearchService,
    private modalService: ModalService
  ) {}

  onSearch() {
    this.searchService.searchItem(this.serachInput).subscribe({
      next: (res) => {
        const list = res.artists.items.filter((item) =>
          item.images.length &&
          item.name
        )
        this.list = list;
      },
      error: () => {
        this.modalService.onOpen({
          isOpen: true,
          title: 'An error occurred',
          message: 'An error happened! Try again later.',
          label: 'Close',
          callback: () => {},
        });
      }
    });
  }

  onCloseList() {
    this.list = [];
  }
}
