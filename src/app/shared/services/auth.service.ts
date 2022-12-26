import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Buffer} from 'buffer';
import { differenceInSeconds } from 'date-fns';

import { environment } from '../../../environments/environment';

interface AuthResponse {
  access_token: string,
  expires_in: number,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient ) { }

  validateToken(lastRequestDate?: string, expiresIn?: number): boolean {
    if(lastRequestDate && expiresIn) {
      const currentDate = new Date();
      const lastRequestDateFormatted = new Date(lastRequestDate);
      const datesDifference = differenceInSeconds(currentDate, lastRequestDateFormatted);

      if(datesDifference < expiresIn) return true;
    }

    return false;
  }

  setNewTokenValues(res: AuthResponse) {
    localStorage.setItem('access-token-value', res.access_token);
    localStorage.setItem('access-token-expires-in', `${res.expires_in}`);
    localStorage.setItem('access-token-last-date', new Date().toString());
  }

  getAccessToken() {
    const currentToken = localStorage.getItem('access-token-value');
    const currentTokenExpiresIn = parseInt(localStorage.getItem('access-token-expires-in') || '0');
    const lastTokenRequest = localStorage.getItem('access-token-last-date');

    if(
      !currentToken ||
      !this.validateToken(lastTokenRequest as string, currentTokenExpiresIn)
    ) {
      this.http.post<AuthResponse>(environment.tokenUrl, 'grant_type=client_credentials', {
        headers: {
          'Authorization': 'Basic ' + (new Buffer(environment.clientId + ':' + environment.clientSecret).toString('base64')),
          'Content-Type':'application/x-www-form-urlencoded'
        },
      }).subscribe({
        next: (res) => this.setNewTokenValues(res),
        error: (err) => { console.log(err) }
      });
    }
  }
}
