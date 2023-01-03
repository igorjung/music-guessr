import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlbumInterface, ArtistInterface, GameInterface } from 'src/app/interfaces';
import { ArtistService, GameService, ModalService } from 'src/app/shared/services';
import { validateAlbums } from 'src/app/utils';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit, OnDestroy {
  artist!: ArtistInterface;
  albums!: AlbumInterface[];

  game: GameInterface = {
    message: '',
    timeLeft: 60,
    score: 0,
    total: 0,
    isRunning: false,
    isOver: false,
  }

  subscription!: Subscription;
  loading: boolean = false;

  constructor(
    private artistService: ArtistService,
    public gameService: GameService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = gameService.onGameRunning().subscribe({
      next: (game) => {
        this.game = game;

        // console.log('######', game);

        if(!game.isRunning && game.isOver) {
          this.modalService.onOpen({
            isOpen: true,
            title: 'Game Over',
            message: game.message,
            label: 'Close',
            callback: () => this.router.navigate(['/']),
          })
        }
      },
    });
  }

  getArtist(id: string): void {
    this.artistService.getArtist(id).subscribe({
      next: (res) => this.artist = res,
      error: () => {
        this.modalService.onOpen({
          isOpen: true,
          title: 'Ops!',
          message: 'An error happened! Try again later.',
          label: 'Close',
          callback: () => this.router.navigate(['/']),
        });
        this.loading = false;
      }
    });
  }

  getArtistAlbum(id: string): void {
    this.artistService.getArtistAlbums(id).subscribe({
      next: (res) => {
        this.albums = validateAlbums(res.items);
        this.loading = false;
        this.gameService.onGameConfig(this.albums.length);
        this.modalService.onOpen({
          isOpen: true,
          title: 'Warning',
          message: 'The game begins when you press "Start", and then you have a certain amount of time to guess all albums by this artist.',
          label: 'Start',
          callback: () => this.gameService.onGameStart(),
        })
      },
      error: () => {
        this.modalService.onOpen({
          isOpen: true,
          title: 'Ops!',
          message: 'An error happened! Try again later.',
          label: 'Close',
          callback: () => this.router.navigate(['/']),
        });
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loading = true;
      this.getArtist(params['id']);
      this.getArtistAlbum(params['id']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
