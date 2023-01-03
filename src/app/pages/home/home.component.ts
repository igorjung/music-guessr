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

  onInfoButtonClick() {
    this.modalService.onOpen({
      isOpen: true,
      title: 'About',
      message: `
        <p>
          Hi, im <b>Igor Jung</b>. This is <b>MusicGuessr</b> a music game, where you choose your favorite artist and try to guess they album's names.
        </p>

        <p>
          This site uses
          <a
            href="https://developer.spotify.com/documentation/web-api/"
            target="_blank"
          >Spotify API</a>
          . Icons created by
          <a
            href="https://www.flaticon.com/authors/freepik"
            target="_blank"
          >Freepik - Flaticon</a>
        </p>

        <small>
          All rights go to the rightful owners - no copyright infringement intended.
        </small>
      `,
      label: 'Close',
      callback: () => {},
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
