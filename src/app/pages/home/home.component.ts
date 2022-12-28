import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ArtistInterface } from 'src/app/interfaces';
import { SearchService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  artists!: ArtistInterface[];
  subscription!: Subscription;
  loading: boolean =  false;

  constructor(
    private searchService: SearchService,
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
      error: (err) => console.log(err),
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this.getPopularArtists();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
