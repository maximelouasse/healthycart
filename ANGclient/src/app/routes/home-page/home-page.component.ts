/*
Import
*/
  // Angular
  import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
  import { FormBuilder, FormGroup } from "@angular/forms";
  import { Router } from '@angular/router';

  // Inner
  import { UserService } from '../../services/user/user.service';
  import { ObservablesService } from '../../services/observable/observable.service';
//

/*
Component configuration
*/
  @Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css']
  })
//

/*
Component class definition
*/
  export class HomePageComponent implements OnInit {

    /*
    Déclarations
    */
      public productsList: any;
      public userId: any;
      public formData: FormGroup;
      showSidenav = false;

      @Input() currentListId: any;
    //

    constructor( private UserService: UserService, private ObservablesService: ObservablesService, private FormBuilder: FormBuilder ) { }

    /*
    Methods
    */
      private getList = (listId = null) => {
        this.UserService.getUserList('user', this.userId)
        .then( apiResponse => {
          this.ObservablesService.getObservableData('list').subscribe( userList => {
            // Check value
            if( userList === null) {
              this.productsList = null;
              this.currentListId = null;
            } else if( listId === null ) {
              this.productsList = userList[0];
              this.currentListId = userList[0]._id;
            } else if(Array.isArray(userList)) {
              let exist = false;

              userList.forEach(element => {
                if(listId === element._id) {
                  this.productsList = element;
                  this.currentListId = element._id;
                  exist = true;
                }
              });

              if(!exist) {
                this.productsList = userList[0];
                this.currentListId = userList[0]._id;
                localStorage.setItem('list-selected', userList[0]._id);
              }
            } else {
              this.productsList = userList;
              this.currentListId = userList._id;
            }
          } )
        })
        .catch( apiResponse => {
          console.error(apiResponse)
        })
      }

      public resetForm = () => {
        this.formData = this.FormBuilder.group({
          product: [ null ]
        });
      };

      public addProduct = (data: any) => {
        this.UserService.addProductToList("list", this.currentListId, {name: data.value.product});
        this.resetForm();
      }

      public deleteProduct = (key) => {
        this.UserService.deleteProductToList("list", this.currentListId, key);
        this.getList(this.currentListId);
      }

      public listChangedHandler = (event: any) => {
        this.getList(event);
        this.showSidenav = false;
      }

      toggleSidenav() {
        this.showSidenav = !this.showSidenav;
      }
    //

    ngOnInit(): void {
      this.resetForm();

      if(localStorage.getItem('local-userId') != null) {
        this.userId = localStorage.getItem('local-userId');

        if(localStorage.getItem('list-selected')) {
          this.getList(localStorage.getItem('list-selected'));
        } else {
          this.getList();
        }
      }
    }

  }
//
