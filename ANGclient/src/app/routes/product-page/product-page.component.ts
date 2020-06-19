/*
Import
*/
  // Angular
  import { Component, OnInit } from '@angular/core';
  import { Router, ActivatedRoute } from '@angular/router';
  import { FormBuilder, FormGroup, Validators } from "@angular/forms";

  // Inner
  import { ProductService } from '../../services/product/product.service';
  import { ObservablesService } from '../../services/observable/observable.service';
//

/*
Component configuration
*/
  @Component({
    selector: 'app-product-page',
    templateUrl: './product-page.component.html',
    styleUrls: ['./product-page.component.css']
  })
//

/*
Component class definition
*/
  export class ProductPageComponent implements OnInit {

    // Declarations
    public productData: any;
    public defaultList = [];
    public qualityList = [];
    public userProduct: any;
    public productScore: any;
    public userNote: Number;
    public formData: FormGroup;
    public selectedNote: Number;

    constructor( private FormBuilder: FormBuilder, private Router: Router, private route: ActivatedRoute, private ProductService: ProductService, private ObservablesService: ObservablesService ) { }

    /*
    Methods
    */
      public scannerPage = () => {
        this.Router.navigateByUrl('/scanner');
      }

      public sendNote = (data) => {
        if(0 < data.note && data.note <= 5) {
          this.ProductService.setUserNoteProduct('product', this.productData.code, data.note, localStorage.getItem('local-userId'))
          .then( apiResponse => {
            if(apiResponse.data != null) {
              let listScore = apiResponse.data.score;
              let averageScore = 0;
              this.productScore = null;
              this.userNote = null;

              if(listScore.length > 0) {
                listScore.forEach(element => {
                  averageScore += element.note;

                  if(element.user === localStorage.getItem('local-userId')) {
                    this.userNote = element.note;
                  }
                });

                this.productScore = Math.round((averageScore / listScore.length) * 100) / 100;
              }
            } else {
              this.productScore = null;
              this.userNote = null
            }
          })
        }
      }

      // Method to reset form
      private resetForm = ()  => {
        this.formData = this.FormBuilder.group({
            note: [ null, Validators.required ]
        });
      };
    //

    ngOnInit() {
      this.resetForm();

      let barcode = this.route.snapshot.params['barcode'];

      if(barcode === undefined) {
        this.productData = null;
        this.ObservablesService.getObservableData('users').subscribe( userInfo => {
          // Check value
          if( userInfo === null) { this.userProduct = null }
          else { this.userProduct = userInfo.products}
        } )
      } else {
        this.ProductService.getProdutData(barcode)
        .then( (data) => {
          this.productData = data.data.product;

          if(typeof this.productData.nutrient_levels['salt'] != undefined) {
            if(this.productData.nutrient_levels['salt'] != "high") {
              this.qualityList.push({name: "salt", value: this.productData.nutrient_levels['salt'], text: "Sel"});
            } else {
              this.defaultList.push({name: "salt", value: this.productData.nutrient_levels['salt'], text: "Sel"});
            }
          }

          if(typeof this.productData.nutrient_levels['sugars'] != undefined) {
            if(this.productData.nutrient_levels['sugars'] != "high") {
              this.qualityList.push({name: "sugars", value: this.productData.nutrient_levels['sugars'], text: "Sucres"});
            } else {
              this.defaultList.push({name: "sugars", value: this.productData.nutrient_levels['sugars'], text: "Sucres"});
            }
          }

          if(typeof this.productData.nutrient_levels['fat'] != undefined) {
            if(this.productData.nutrient_levels['fat'] != "high") {
              this.qualityList.push({name: "fat", value: this.productData.nutrient_levels['fat'], text: "Matières grasses / Lipides"});
            } else {
              this.defaultList.push({name: "fat", value: this.productData.nutrient_levels['fat'], text: "Matières grasses / Lipides"});
            }
          }

          if(typeof this.productData.nutrient_levels['saturated-fat'] != undefined) {
            if(this.productData.nutrient_levels['saturated-fat'] != "high") {
              this.qualityList.push({name: "saturated-fat", value: this.productData.nutrient_levels['saturated-fat'], text: "Acides gras saturés"});
            } else {
              this.defaultList.push({name: "saturated-fat", value: this.productData.nutrient_levels['saturated-fat'], text: "Acides gras saturés"});
            }
          }

          this.ObservablesService.getObservableData('product').subscribe( productInfo => {
            // Check value
            if( productInfo !== null) {
              this.productScore = productInfo;
            } else {
              this.ProductService.getProductScore('product', barcode)
              .then( apiResponse => {
                if(apiResponse.data != null) {
                  let listScore = apiResponse.data.score;
                  let averageScore = 0;
                  this.productScore = null;
                  this.userNote = null;

                  if(listScore.length > 0) {
                    listScore.forEach(element => {
                      averageScore += element.note;

                      if(element.user === localStorage.getItem('local-userId')) {
                        this.userNote = element.note;
                      }
                    });

                    this.productScore = Math.round((averageScore / listScore.length) * 100) / 100;
                  }
                } else {
                  this.productScore = null;
                  this.userNote = null
                }
              })
            }
          })
        });
      }
    }

  }
//
