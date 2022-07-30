import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorComponent } from '../director/director.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationToolbarComponent } from '../navigation-toolbar/navigation-toolbar.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }


  /**
   * gets movies from API request
   * @returns an array with all movies objects
   * @function getAllMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * gets users' favorite movies from API request
   * @returns an array with movie ids of user's favorite movies
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
    });
  }

  /**
   * checks if movie is already in user's favorites list
   * @param _id 
   * @returns true: if movie is in user's favorites, else false
   */
  isFav(_id: string): boolean {
    return this.favoriteMovies.includes(_id)
  }

  /**
   * adds a movie to user's favorite movies list/array with API request
   * @param _id 
   * @function addFavoriteMovie
   */
  addFavoriteMovie(_id: string): void {
    console.log(_id);
    this.fetchApiData.addFavoriteMovie(_id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

  /**
   * removes a movie from the user's favorites list with API request
   * @param _id 
   * @function removeFavoriteMovie
   */
  removeFavoriteMovie(_id: string): void {
    console.log(_id);
    this.fetchApiData.removeFavoriteMovie(_id).subscribe((response) => {
      console.log(response);
      this.ngOnInit();
    })
  }

  /**
   * opens the user genre dialog from GenreComponent to show genre details
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * opens the director dialog from DirectorComponent to display director details
   * @param name 
   * @param bio 
   * @param birth 
   * @param death 
   */
  openDirectorDialog(
    name: string, bio: string, birth: Date, death: Date
  ): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death,
      },
      width: '500px'
    });
  }

  /**
   * opens the synopsis dialog from MovieSynopsisComponent to display movie details
   * @param title 
   * @param description 
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
      width: '500px'
    });
  }

}
