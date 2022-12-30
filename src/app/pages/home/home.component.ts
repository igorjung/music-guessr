import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtistInterface } from 'src/app/interfaces';
import { ModalService, SearchService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  artists!: ArtistInterface[];
  subscription!: Subscription;
  loading: boolean =  false;

  isErrorVisible: boolean = false;
  message: string = '';

  constructor(
    private searchService: SearchService,
    private modalService: ModalService,
  ) {}

  getUserRegion(): string {
    const [, region] = navigator.language.split('-');
    return region;
  }

  getPopularArtists() {
    const region = this.getUserRegion();

    this.subscription = this.searchService.searchPopularArtis(region).subscribe({
      next: (res) => {
        this.artists = res.artists.items
        this.loading = false;
      },
      error: () => {
        this.modalService.onOpen({
          isOpen: true,
          title: 'Ops!',
          message: 'An error happened! Try again later.',
          label: 'Close',
          callback: () => {},
        });
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.getPopularArtists();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
