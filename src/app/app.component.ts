import { Component } from '@angular/core';

import { MovieCardComponent } from './movie-card/movie-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFLix-Angular-client';

  constructor() { }


  /*
    openMoviesDialog(): void {
      this.dialog.open(MovieCardComponent, {
        width: '500px'
      });
    }
  
    */

}
