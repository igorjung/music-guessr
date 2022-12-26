import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistInterface } from '../../interfaces';

interface SearchResponse {
  artists: {
    items: ArtistInterface[],
  },
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  url = 'https://api.spotify.com/v1/search?'
  accessToken: string = ''

  constructor(
    private http: HttpClient
  ) {
    this.accessToken = localStorage.getItem('access-token-value') || '';
  }

  searchItem(search: string) {
    const query = `artist:${search}`;
    const type = 'artist';

   return this.http.get<SearchResponse>(`${this.url}q=${query}&type=${type}&limit=10`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }

  searchPopularArtis(region: string) {
    const query = `year:${new Date().getFullYear()}`;
    const type = 'artist';

    return this.http.get<SearchResponse>(`${this.url}q=${query}&market=${region}&type=${type}&limit=12`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    });
  }
}
