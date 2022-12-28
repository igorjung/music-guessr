import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistInterface, AlbumInterface } from 'src/app/interfaces';

interface ArtistAlbumResponse {
  items: AlbumInterface[],
}

@Injectable()
export class ArtistService {

  url = 'https://api.spotify.com/v1/artists/'

  constructor( private http: HttpClient ) {}

  getArtist(id: string) {
    return this.http.get<ArtistInterface>(`${this.url}${id}`)
  }

  getArtistAlbums(id: string) {
    return this.http.get<ArtistAlbumResponse>(`${this.url}${id}/albums?include_groups=album&limit=50&market=US`)
  }
}
