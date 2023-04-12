import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://127.0.0.1:4000/api/products/';
  
  constructor(private _http: HttpClient) { 

  }

  getProducts(): Observable<Product[]>{
    return this._http.get<Product[]>(this.url);
  }

  deleteProduct(id:any): Observable<any>{
    return this._http.delete<any>(`${this.url}/${id}`);
  }
}
