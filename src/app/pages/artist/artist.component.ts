import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlbumInterface, ArtistInterface } from 'src/app/interfaces';
import { ArtistService, GameService } from 'src/app/shared/services';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {
  artist!: ArtistInterface;
  albums!: AlbumInterface[];

  score: number = 0;
  total: number = 0;
  timeLeft: number = 0;
  gameOver: boolean = false;
  message: string = '';

  isWarningVisible: boolean = false;
  gameSubscription!: Subscription;

  constructor(
    private artistService: ArtistService,
    public gameService: GameService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.artistService.getArtist(params['id']).subscribe({
        next: (res) => this.artist = res,
        error: (err) => console.log(err)
      });

      this.artistService.getArtistAlbums(params['id']).subscribe({
        next: (res) => {
          let savedAlbums: AlbumInterface[] = [];

          res.items.forEach(album => {
            const filterAlbumsByName = savedAlbums.filter((item) =>
              item.name.toUpperCase() === album.name.toUpperCase()
            );

            const checkAlbumVersion =
              album.name.toUpperCase().includes("DELUXE") ||
              album.name.toUpperCase().includes("KARAOKE") ||
              album.name.toUpperCase().includes("EDITION") ||
              album.name.toUpperCase().includes("TOUR") ||
              album.name.toUpperCase().includes("LIVE FROM") ||
              album.name.toUpperCase().includes("STUDIO SESSION") ||
              album.name.toUpperCase().includes("RELEASE SPECIAL");

            if(!filterAlbumsByName.length && !checkAlbumVersion) {
              savedAlbums.push(album)
            }
          });

          this.albums = savedAlbums;
          this.total = this.albums.length;
          this.isWarningVisible = true;
        },
        error: (err) => console.log(err)
      });
    });

    this.timeLeft = this.gameService.setTime(this.total);
  }

  ngOnDestroy(): void {
    this.gameSubscription.unsubscribe();
  }

  onWarningClose() {
    this.gameSubscription = this.gameService.onGameStart(this.total).subscribe({
      next: (res) => {
        this.timeLeft = res.timeLeft;
        this.score = res.score;

        if(res.gameOver) {
          this.message = res.message;
          this.gameOver = true;
          this.gameSubscription.unsubscribe();
          window.scroll(0, 0);
        }
      },
    });
  }

  returnToHome() {
    this.router.navigate(['/']);
  }

  onStatusUpdate(status: string) {
    if(status === 'IS_CORRECT') {
      this.gameService.onGameScore();
    }
  }
}
