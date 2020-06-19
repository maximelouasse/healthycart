/*
Imports
*/
	import { Injectable } from '@angular/core';
	import { HttpClient, HttpHeaders } from '@angular/common/http';
	import { ObservablesService } from "../observable/observable.service";
  import { environment } from 'src/environments/environment';
//

/*
Definition & export
*/
	@Injectable({
		providedIn: 'root'
	})

	export class UserService {
		/*
		Déclarations
		*/
				private apiUrl: String;
		//

		constructor( private HttpClient: HttpClient, private ObservablesService: ObservablesService ) {
				this.apiUrl = environment.apiUrl;
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

    public getUserList = (endpoint: String, userId: String) => {
      return this.HttpClient.get(`${this.apiUrl}/${endpoint}/${userId}/list`)
      .toPromise()
      .then( data => this.getData(data, "list") )
      .catch(this.handleError);
    }

    public addUserList = (endpoint: String, userId: String, name: String) => {
      return this.HttpClient.post(`${this.apiUrl}/${endpoint}`, { name: name, user: userId })
      .toPromise()
      .then( data => this.getData(data) )
      .catch(this.handleError);
    }

    public addProductScanned = (endpoint: String, userId: String, data: any) => {
      return this.HttpClient.post(`${this.apiUrl}/${endpoint}/${userId}/product`, {barcode: data.product.code, img_url: data.product.image_url, name: data.product.product_name_fr})
      .toPromise()
      .then( data => this.getData(data, endpoint) )
      .catch(this.handleError);
    }

    public addProductToList = (endpoint: String, listId: String, data: any) => {
      return this.HttpClient.post(`${this.apiUrl}/${endpoint}/${listId}/product`, data)
      .toPromise()
      .then( data => this.getData(data, 'list') )
      .catch(this.handleError);
    }

    public deleteProductToList = (endpoint: String, listId: String, productId: any) => {
      return this.HttpClient.put(`${this.apiUrl}/${endpoint}/${listId}/product`, {productId: productId})
      .toPromise()
      .then( data => this.getData(data) )
      .catch(this.handleError);
    }

		/*
		Methods to get API responses
		*/
		// Get the API response
		private getData(apiResponse: any, endpoint: String = '') {
      console.log(apiResponse);
      console.log(endpoint);
			switch(endpoint) {
        case "list":
          this.ObservablesService.setObservableData("list", apiResponse.data);

				default:
					return apiResponse || {};
			}
		};

				// Get the API error
				private handleError(err: any){
						return Promise.reject(err);
				};
		//
	}
//
