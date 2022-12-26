import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistInterface, AlbumInterface } from 'src/app/interfaces';

interface ArtistAlbumResponse {
  items: AlbumInterface[],
}

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  url = 'https://api.spotify.com/v1/artists/'
  accessToken: string = ''

  constructor(
    private http: HttpClient
  ) {
    this.accessToken = localStorage.getItem('access-token-value') || '';
  }

  getArtist(id: string) {
    return this.http.get<ArtistInterface>(`${this.url}${id}`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    })
  }

  getArtistAlbums(id: string) {
    return this.http.get<ArtistAlbumResponse>(`${this.url}${id}/albums?include_groups=album&limit=50&market=US`, {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    })
  }
}
