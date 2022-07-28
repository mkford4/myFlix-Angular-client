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

  //------------------REGISTRATION-----------------------
  //Making the API class for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // -------------------LOGIN------------------------
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

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

  //-------------------ADD FAVORITE MOVIES TO USER LIST---------------
  addFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  //-----------------REMOVE FAVORITE MOVIE FROM LIST---------------
  removeFavoriteMovie(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieID}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

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

  //extracts response data from HTTP response
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  //handles errors
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened deleting your profile; please try again later,');
  }
}