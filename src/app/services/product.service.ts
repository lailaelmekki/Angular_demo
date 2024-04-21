import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../modele/product.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  public getProducts(keyword:String="",page:number=1,size:number=4) {
    return this.http.get(`http://localhost:3000/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});
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


  getProductById(productId: number):Observable<Product> {
    return this.http.get<Product>(`http://localhost:3000/products/${productId}`)


  }

  updateProduct(product: Product):Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/products/${product.id}`,product);

  }
}
