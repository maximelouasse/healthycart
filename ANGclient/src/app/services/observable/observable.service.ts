/*
Imports
*/
  // Angular
  import { Injectable } from '@angular/core';
  import { BehaviorSubject, Observable } from 'rxjs';
//

/*
Definition and export
*/
  @Injectable({
    providedIn: 'root'
  })
  export class ObservablesService {

    constructor() {}

    // Init observable
    protected userInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected productInfo: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    protected userList: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    // Set observable value
    public setObservableData = (type: string, data: any) => {
      console.log({data, type});
      switch(type) {
        case 'users':
          this.userInfo.next(data);
          break;

        case 'login':
          // Set local storage
          if(data._id != 'undefined' && data._id != null) {
            localStorage.setItem('local-userId', data._id );
          }
          this.userInfo.next(data);
          break;

        case 'logout':
          this.userInfo.next(data);
          break;

        case 'product':
          this.productInfo.next(data);
          break;

        case 'list':
          this.userList.next(data);
          break;

        default:
          break;
      };
    };

    // Get observable value
    public getObservableData = (type: string) => {
      switch(type) {
        case 'users':
          return this.userInfo;

        case 'product':
          return this.productInfo;

        case 'list':
          return this.userList;

        default:
        break;
      };
    };
  }
//
