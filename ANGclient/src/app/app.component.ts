/*
Imports
*/
  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';

  // Inner
  import { AuthService } from './services/auth/auth.service';
  import { ObservablesService } from './services/observable/observable.service';
//

/*
Componant configuration
*/
  @Component({
    selector: 'app-root',
    template: `
      <router-outlet></router-outlet>
      <app-bot-bar></app-bot-bar>
    `
  })
//

/*
Export
*/
  export class AppComponent implements OnInit {

    constructor( private ObservablesService: ObservablesService, private AuthService: AuthService, private Router: Router ){}

      ngOnInit() {
        if(localStorage.getItem('local-userId') != null) {
          this.AuthService.identity({ "id": localStorage.getItem('local-userId') })
          .then( apiResponse => {
            // Save user data
            this.ObservablesService.setObservableData('users', apiResponse.data);

            // Navigation to protected route
            //this.Router.navigateByUrl('/');
          })
          .catch( error => console.log("Auto connection fail", error));
        } else {
          this.Router.navigateByUrl('/login');
        }
      }
  }
//
