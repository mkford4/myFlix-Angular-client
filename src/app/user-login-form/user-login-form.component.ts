import { Component, OnInit, Input } from '@angular/core';

//closes the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
//brings in the API calls from fetch
import { FetchApiDataService } from '../fetch-api-data.service';
//used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * sends login form inputs from user to backend with FetchApiDataService
   * @function userLogin
   * redirects user with Router to movie card upon successful login
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      //Logic for a successful user registration goes HERE ---------
      this.dialogRef.close(); //closes modal on success
      console.log(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', response.user.Username);

      //redirect to movies page once logged in
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}

