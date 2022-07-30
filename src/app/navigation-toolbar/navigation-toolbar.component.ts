import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-navigation-toolbar',
  templateUrl: './navigation-toolbar.component.html',
  styleUrls: ['./navigation-toolbar.component.scss']
})
export class NavigationToolbarComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialogModule,
  ) { }

  ngOnInit(): void {
  }

  /**
   * navigates using Router to movies card
   */
  goMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * navigates using Route to profile card
   */
  goProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * logs out user, clears local storage to reset token and user
   * navigates upon logout to welcome card
   */
  logOut(): void {
    localStorage.clear();
    this.snackBar.open('You have been successfully logged out', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);

  }
}