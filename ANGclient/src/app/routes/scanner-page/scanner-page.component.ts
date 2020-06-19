/*
Import
*/
  // Angular
  import { Component, OnInit, Output, EventEmitter } from '@angular/core';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";
  import { Router } from '@angular/router';

  // Inner
  import { ProductService } from '../../services/product/product.service';
  import { UserService } from '../../services/user/user.service';
  import { ObservablesService } from '../../services/observable/observable.service';
//

/*
Component configuration
*/
  @Component({
    selector: 'app-scanner-page',
    templateUrl: './scanner-page.component.html',
    styleUrls: ['./scanner-page.component.css']
  })
//

/*
Component class definition
*/
  export class ScannerPageComponent implements OnInit {

    // Declarations
    public formData: FormGroup;
    public userId: String;

    constructor( private Router: Router, private FormBuilder: FormBuilder, private ProductService: ProductService, private UserService: UserService, private ObservablesService: ObservablesService ) { }

    // Method to reset form
    private resetForm = ()  => {
      this.formData = this.FormBuilder.group({
          barcode: [ null, Validators.required ]
      });
    };

    public getProduct = (event) => {
      this.ProductService.getProdutData(event.barcode)
      .then( apiResponse => {
        // Check value
        if( apiResponse.err ) {
          this.ProductService.getProductOpenfoodfact(event.barcode)
          .then( data => {
            if(data.status) {
              this.ProductService.saveJsonProduct(event.barcode, data)
              .then( result => {
                this.UserService.addProductScanned("user", this.userId, result.data)
                .then( data => {
                  this.Router.navigateByUrl('/product/' + event.barcode);
                } )
              })
            }
          } )
        } else {
          this.UserService.addProductScanned("user", this.userId, apiResponse.data)
          .then( data => {
            this.Router.navigateByUrl('/product/' + event.barcode);
          })
        }
      })
      .catch( error => console.log(error));
    }

    ngOnInit(): void {
      if(localStorage.getItem('local-userId') != null) {
        this.userId = localStorage.getItem('local-userId');
      }
      this.resetForm();
    }

  }
//
