import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../modele/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  public getProducts(page:number=1,size:number=4): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(`http://localhost:3000/products?_page=${page}&_limit=${size}`);
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:3000/products/${+product.id}`, { checked: !product.checked });
  }
  public deleteProduct(product: Product){
    return this.http.delete<any>(`http://localhost:3000/products/${+product.id}`);
  }

  saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`http://localhost:3000/products`, product);



  }


}
