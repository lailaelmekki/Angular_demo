import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../modele/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements   OnInit {
  public products :Array<Product>=[];
  public keyword: string="";

  //products$ !:Observable<Array<Product>>

  constructor(private productService:ProductService
  ) {
  }
  ngOnInit() {
    this.getProduct()




  }

  getProduct(){

    this.productService.getProducts(1,2)
      .subscribe({
        next:data=> {
          this.products = data
        },
        error: err=>{
          console.log(err);
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
          this.products=this.products.filter(p=>p.id!=product.id);
        }
      })
  }


}
