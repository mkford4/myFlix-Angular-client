import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';

import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFLix-Angular-client';

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule,
  ) { }

  goMovies(): void {
    this.router.navigate(['movies']);
  }

  goProfile(): void {
    this.router.navigate(['profile']);
  }

  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);

    /*
      openMoviesDialog(): void {
        this.dialog.open(MovieCardComponent, {
          width: '500px'
        });
      }
    
      */

  }
}
