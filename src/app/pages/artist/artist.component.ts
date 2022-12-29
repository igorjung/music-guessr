import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlbumInterface, ArtistInterface } from 'src/app/interfaces';
import { ArtistService, GameService, ModalService } from 'src/app/shared/services';

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

  gameSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private artistService: ArtistService,
    public gameService: GameService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;

      this.artistService.getArtist(params['id']).subscribe({
        next: (res) => this.artist = res,
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
          this.loading = false;
          this.modalService.onOpen({
            isOpen: true,
            title: 'Warning',
            message: 'The game begins when you press "Start", and then you have a certain amount of time to guess all albums by this artist.',
            label: 'Start',
          })
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
          this.gameOver = true;
          this.modalService.onOpen({
            isOpen: true,
            title: 'End of game',
            message: 'res.message',
            label: 'Close',
          })
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
