import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
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
      error: (err) => {
        console.log(err);
        this.modalService.onOpen({
          isOpen: true,
          title: 'An error occurred',
          message: 'message',
          label: 'Close',
        });
        this.loading = false;
      }
    });
  }

  returnToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.loading = true;
    this.getPopularArtists();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
