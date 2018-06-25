import { IProduct } from "./products";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProductService {

    private _productUrl;

    constructor(private _http: HttpClient){
        this._productUrl = './api/products/products.json';
    }
    
    getProducts(): Observable<IProduct[]> {
       
        return this._http.get<IProduct[]>(this._productUrl)
        .do(data => console.log(' All products: '+ JSON.stringify(data)))
        .catch(this.handleError);
    } 

    private handleError(err) {
        let errorMessage: string;

        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
          }
          console.log(errorMessage);
        return Observable.throw(err);
    }
}