import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Buffer} from 'buffer';
import { Injectable } from '@angular/core';
import { differenceInSeconds } from 'date-fns';

import { Observable, switchMap, tap } from 'rxjs';

import { environment } from '../../../environments/environment';

interface AuthResponse {
  access_token: string,
  expires_in: number,
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor( private http: HttpClient ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(request.url === environment.tokenUrl) {
      return next.handle(request);
    }

    const token = localStorage.getItem('access-token-value');

    if(!token || !this.validateToken()) {
      return this.getAccessToken().pipe(
        tap(res => {
          localStorage.setItem('access-token-value', res.access_token);
          localStorage.setItem('access-token-expires-in', `${res.expires_in}`);
          localStorage.setItem('access-token-last-date', new Date().toString());
        }),
        switchMap(res => {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${res.access_token}`,
            }
          });

          return next.handle(request);
        })
      );
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      }
    });

    return next.handle(request);
  }

  validateToken(): boolean {
    const expiresIn = parseInt(localStorage.getItem('access-token-expires-in') || '0');
    const lastRequestDate = localStorage.getItem('access-token-last-date');

    if(lastRequestDate && expiresIn) {
      const currentDate = new Date();
      const lastRequestDateFormatted = new Date(lastRequestDate);
      const datesDifference = differenceInSeconds(currentDate, lastRequestDateFormatted);

      if(datesDifference < expiresIn) return true;
    }

    return false;
  }

  getAccessToken() {
    return this.http.post<AuthResponse>(environment.tokenUrl, 'grant_type=client_credentials', {
      headers: {
        'Authorization': 'Basic ' + (new Buffer(environment.clientId + ':' + environment.clientSecret).toString('base64')),
        'Content-Type':'application/x-www-form-urlencoded'
      },
    });
  }
}
