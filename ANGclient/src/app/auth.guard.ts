// Imports
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Inner
import { AuthService } from "./services/auth/auth.service";

// Definition
@Injectable({ providedIn: 'root' })

// Export
export class AuthGuard implements CanActivate {

    constructor(
        private AuthService: AuthService,
        private Router: Router,
    ){}


    canActivate(): Promise<any> {
        return new Promise( (resolve, reject) => {
          if(localStorage.getItem('local-userId') === null) {
            return resolve(false)
          } else {
            this.AuthService.identity({ 'id': localStorage.getItem('local-userId')})
            .then( ( apiResponse ) => {
              if(apiResponse.err == null) { return resolve(true) }
              else { this.Router.navigateByUrl('/') };
            })
            .catch( ( apiResponse ) =>  this.Router.navigateByUrl('/login'))
          }
        })
    }
}
