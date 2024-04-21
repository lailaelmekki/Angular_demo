import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../modele/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements   OnInit {
  public products :Array<Product>=[];
  public keyword: string="";
  totalPages:number=0;
  pageSize:number=3;
  currentPage :number=1;

  //products$ !:Observable<Array<Product>>

  constructor(private productService:ProductService , private router: Router
  ) {
  }
  ngOnInit() {
    this.getProduct()




  }

  getProduct(){

    this.productService.getProducts(this.keyword,this.currentPage,this.pageSize )
      .subscribe({
        next: (resp)=> {
          this.products = resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('x-total-count')!);
          //const totalProducts = this.products.length;
          this.totalPages=Math.floor(totalProducts / this.pageSize);
          if(totalProducts % this.pageSize !=0){
            this.totalPages=this.totalPages+1;
          }
          console.log(this.totalPages);
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


  handleGotoPage(page: number) {
    this.currentPage=page;
    this.getProduct();

  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)


  }
}
