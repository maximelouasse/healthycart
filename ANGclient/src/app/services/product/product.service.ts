/*
Import
*/
  // Angular
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';

  // Inner
  import { environment } from "../../../environments/environment";
  import { ObservablesService } from "../observable/observable.service";
import { Observable } from 'rxjs';
//

/*
Definition and export
*/
  @Injectable()
  export class ProductService {

    /*
		Déclarations
		*/
      private apiUrl: String;
      private apiOpenFoodUrl: String;
    //

    // Inject module(s) in the service
    constructor( private HttpClient: HttpClient, private ObservablesService: ObservablesService ) {
      this.apiUrl = environment.apiUrl
      this.apiOpenFoodUrl = environment.openFoodUrl;
    };

    /*
    Method to set header
    */
      private setHeaderRequest = () => {
        // Set header
        let myHeader = new HttpHeaders();
        myHeader.append('Content-Type', 'application/json');

        // Return header
        return { headers: myHeader };
      }
    //

    // Get product Open Food Fact
    public getProductOpenfoodfact(barcode: String): Promise<any> {
      return this.HttpClient.get(`${this.apiOpenFoodUrl}/${barcode}.json`, this.setHeaderRequest())
      .toPromise()
      .then( jsonData => this.getData(jsonData))
      .catch(this.handleError);
    }
    //

    // Get product data
    public getProdutData(barcode: String): Promise<any> {
      return this.HttpClient.post(`${this.apiUrl}/openfoodfacts`, {"barcode": barcode}, this.setHeaderRequest())
      .toPromise()
      .then( data => this.getData(data))
      .catch(this.handleError);
    }

    // Save JSON file product
    public saveJsonProduct(barcode: String, data: String): Promise<any> {
      return this.HttpClient.post(`${this.apiUrl}/openfoodfacts`, {"barcode": barcode, "jsonData": data}, this.setHeaderRequest())
      .toPromise()
      .then( createData => this.getData(createData))
      .catch(this.handleError);
    }

    // Get product score
    public getProductScore(endpoint: String, barcode: String): Promise<any> {
      return this.HttpClient.get(`${this.apiUrl}/${endpoint}/${barcode}`, this.setHeaderRequest())
      .toPromise()
      .then( productData => this.getData(productData, 'product'))
      .catch(this.handleError);
    }

    // Send user note product
    public setUserNoteProduct(endpoint: String, barcode: String, note: Number, userId: String): Promise<any> {
      return this.HttpClient.post(`${this.apiUrl}/${endpoint}/note`, {"barcode": barcode, "note": note, "userId": userId}, this.setHeaderRequest())
      .toPromise()
      .then( createData => this.getData(createData, 'product'))
      .catch(this.handleError);
    }

    /*
		Methods to get API responses
		*/
      // Get the API response
      private getData(apiResponse: any, endpoint: String = '') {
        console.log(apiResponse);
        switch(endpoint) {
          case 'product':
            if(apiResponse.data != null && apiResponse.err == false && typeof apiResponse.data != undefined) {
              this.ObservablesService.setObservableData('product', apiResponse.data);
              return apiResponse.data;
            }

          default:
            return apiResponse || {};
        }
      };

    // Get the API error
      private handleError(err: any) {
          return Promise.reject(err);
      };
    //
  }
//
