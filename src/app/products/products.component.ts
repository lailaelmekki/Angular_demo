import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../modele/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements   OnInit {


  //products$ !:Observable<Array<Product>>

  constructor(private productService:ProductService , private router: Router,public appState:AppStateService
  ) {
  }
  ngOnInit() {
    this.getProduct()




  }

  getProduct(){
    this.appState.setProductState({
      status: "LOADING"
    })
    this.productService.getProducts(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize)
        .subscribe({
          next : (resp) =>{
            let products=resp.body as Product[];
            let totalProducts:number=parseInt(resp.headers.get('x-total-count')!)
            //this.appState.productsState.totalProducts=totalProducts;
            let totalPages=Math.floor(totalProducts/ this.appState.productState.pageSize);
            if(totalProducts% this.appState.productState.pageSize!=0){
              ++totalPages;
            }
            this.appState.setProductState({
              products:products,
              totalProducts : totalProducts,
              totalPages : totalPages,
              status: "LOADED"
            })
          } ,
          error : err => {
            this.appState.setProductState({
              status: "ERROR",
              errorMessage : err
            })
          }
        })

    // this.products$=this.productService.getProducts();
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)

      .subscribe({
        next :updatedProduct => {
          //product.checked = !product.checked;
          this.getProduct()
        }
      });
  }

  handleDelete(product: Product) {
      if(confirm("Etes vous sure?"))
      this.productService.deleteProduct(product).subscribe({
        next:value => {
           //this.getProduct();
          this.appState.productState.products=this.appState.productState.products.filter((p:any)=>p.id!=product.id);
        }
      })
  }


  handleGotoPage(page: number) {
    this.appState.productState.currentPage=page;
    this.getProduct();

  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)


  }
}
