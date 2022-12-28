import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ArtistInterface } from '../../interfaces';

interface SearchResponse {
  artists: {
    items: ArtistInterface[],
  },
}

@Injectable()
export class SearchService {
  url = 'https://api.spotify.com/v1/search?'

  constructor( private http: HttpClient ) {}

  searchItem(search: string) {
    const query = `artist:${search}`;
    const type = 'artist';

   return this.http.get<SearchResponse>(`${this.url}q=${query}&type=${type}&limit=10`);
  }

  searchPopularArtis(region: string) {
    const query = `year:${new Date().getFullYear()}`;
    const type = 'artist';

    return this.http.get<SearchResponse>(`${this.url}q=${query}&market=${region}&type=${type}&limit=12`);
  }
}
