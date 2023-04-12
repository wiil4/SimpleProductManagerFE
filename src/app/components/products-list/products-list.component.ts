import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent{
  productsList: Product[] = [];

  constructor(private _productService: ProductService,
    private _toastr: ToastrService){
  }

  ngOnInit(){
    this.getProducts();
  }

  getProducts(){
    this._productService.getProducts().subscribe({
      next:data=>{
        this.productsList = data;
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  deleteProduct(id:any){
    this._productService.deleteProduct(id).subscribe({
      next:data=>{
        this._toastr.error('Product has been deleted succesfully', 'Product Deleted');
        this.getProducts();
      },
      error:err=>{
        console.log(err);
      }
    });
  }
}
