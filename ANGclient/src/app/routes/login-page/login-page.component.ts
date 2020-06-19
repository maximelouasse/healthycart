/*
Import
*/
  // Angular
  import { Component, OnInit, Input } from '@angular/core';
  import { Router } from '@angular/router';

  // Inner
  import { AuthService } from "../../services/auth/auth.service";
  import { ObservablesService } from "../../services/observable/observable.service";
//

/*
Component configuration
*/
  @Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
  })
//

/*
Component class definition
*/
  export class LoginPageComponent implements OnInit {

    constructor( private AuthService: AuthService, private ObservablesService: ObservablesService, private Router: Router ) {

    }

    // Method to login user infos
    public loginUser = ( data: any ) => {
      this.AuthService.login({ 'email': data.email, 'password': data.password })
      .then( userInfo => {
        console.log('SUCCESS request', userInfo);
        this.Router.navigateByUrl('/');
      })
      .catch( error => {
        console.log('ERROR request', error);
      });
    };

    ngOnInit(): void {
    }

  }
//
