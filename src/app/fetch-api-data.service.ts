import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the API url that will provide data for the client app
const apiUrl = 'https://bechflix.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class - dependency injection
  constructor(private http: HttpClient) { }

  /**
   * calls API endpoints to register a new user
   * @param userDetails 
   * @returns 
   */
  //------------------REGISTRATION-----------------------
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoints to login an existing user
   * @param userDetails
   * @returns 
   */
  // -------------------LOGIN------------------------
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to get data on ALL movies
   * @returns array of all movies in JSON format
   */
  //----------------GET ALL MOVIES------------------------
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(map(this.extractResponseData), catchError(this.handleError)
    );
  }

  /**
   * calls API endpoing to get data on a single chosen movie
   * @param title 
   * @returns JSON object with movie data
   */
  //------------------GET SINGLE MOVIE---------------------------
  getSingleMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to get data on a chosen director
   * @param name 
   * @returns JSON object with director data
   */
  //-------------------GET DIRECTOR-------------------------
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/director/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to get data on a chosen genre
   * @param name 
   * @returns JSON object with genre data
   */
  //-------------------GET GENRE-------------------------
  getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genre/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoints to get data on a single user
   * @returns JSON object with data on requested user
   */
  //-----------------------GET USER---------------------------
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoing to get list of favorite movies for the user
   * @returns list of the user's favorite movies in JSON format
   */
  //---------------------GET FAVORITE MOVIES FOR USER------------------
  getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  /**
   * calls API endpoint to add a movie to the user's favorites list
   * @param _id 
   * @returns JSON object with user data
   */
  //-------------------ADD FAVORITE MOVIES TO USER LIST---------------
  addFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${_id}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to delete a movie from the user's favorites list
   * @param _id 
   * @returns JSON object with user data
   */
  //-----------------REMOVE FAVORITE MOVIE FROM LIST---------------
  removeFavoriteMovie(_id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${_id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to allow user to edit and update user information
   * @param updateDetails 
   * @returns JSON object with updated user data
   */
  //----------------EDIT USER--------------------------
  editUser(updateDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, updateDetails, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * calls API endpoint to remove existing user's account
   * @returns 
   */
  //-------------------DELETE USER----------------------
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * extracts response data from HTTP response
   * @param res 
   * @returns response body or empty object
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * handles errors
   * @param error 
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later,');
  }
}