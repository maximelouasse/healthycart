/*
Imports
*/
  // Angular
  import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";
  import { Router } from '@angular/router';

  // Inner
  import { ObservablesService } from '../../services/observable/observable.service';
  import { UserService } from '../../services/user/user.service';
//

/*
Componant configuration
*/
  @Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
  })
//

/*
Export
*/
  export class SideBarComponent implements OnInit {

    // Declarations
    public userList: any;
    public userId: String;
    public hideFormNewList: Boolean = true;
    public formData: FormGroup;

    @Output() listChanged = new EventEmitter();
    @Input() open = false;

    constructor( private ObservablesService: ObservablesService, private UserService: UserService, private Router: Router, private FormBuilder: FormBuilder ){}

    /*
    Methods
    */
      private getList = () => {
        this.UserService.getUserList('user', this.userId)
        .then( apiResponse => {
          this.userList = apiResponse.data;
        })
        .catch( apiResponse => {
          console.error(apiResponse)
        })
      }

      public logout = () => {
        localStorage.removeItem('local-userId');
        // Set user info observabale value
        this.ObservablesService.setObservableData('logout', null);
        this.Router.navigateByUrl('/');
      }

      public changeCurrentList = (listId) => {
        localStorage.setItem('list-selected', listId);
        this.listChanged.emit(listId);
      }

      public toggleForm = () => {
        this.hideFormNewList = !this.hideFormNewList;
      }

      public resetForm = () => {
        this.formData = this.FormBuilder.group({
          name: [ null, Validators.required ]
        });
      }

      public newList = (data: any) => {
        if(data.value.name != null) {
          this.UserService.addUserList('list', this.userId, data.value.name)
          .then(data => {
            this.resetForm();
            this.getList();
            this.toggleForm();
          });
        }
      }
    //

    ngOnInit(): void {
      this.resetForm();

      if(localStorage.getItem('local-userId') != null) {
        this.ObservablesService.getObservableData('list').subscribe( userList => {
          // Check value
          if( userList === null) { this.userList = null }
          else { this.userList = userList}
        })

        this.userId = localStorage.getItem('local-userId');
        //this.getList();
      }
    }

  }
//
