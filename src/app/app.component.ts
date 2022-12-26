import { Component, OnInit } from '@angular/core';
import { AuthService, SearchService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.authService.getAccessToken();
  }

  onChange(q: string) {
    this.searchService.searchItem(q).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
    });
  }
}
