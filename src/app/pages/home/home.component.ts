import { Component, OnInit } from '@angular/core';
import { ArtistInterface } from 'src/app/interfaces';
import { SearchService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  artists!: ArtistInterface[];

  constructor(
    private searchService: SearchService
  ) {}

  getUserRegion(): string {
    const [, region] = navigator.language.split('-');
    return region;
  }

  ngOnInit(): void {
    const region = this.getUserRegion();

    this.searchService.searchPopularArtis(region).subscribe({
      next: (res) => {
        console.log(res);
        this.artists = res.artists.items
      },
      error: (err) => console.log(err),
    })
  }
}
