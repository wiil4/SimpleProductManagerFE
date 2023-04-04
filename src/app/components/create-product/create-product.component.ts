import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  e:string ='e';
  productForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _router:Router,
    private toastr: ToastrService){

      this.productForm = this._fb.group({
        product:['', Validators.required],
        category:['', Validators.required],
        location:['', Validators.required],
        price:['', Validators.required]
      })
  }

  addProduct(){
    const product : Product ={
      name:this.productForm.get('product')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value
    }
    this.toastr.success('Succesfully added', 'Product Information');
    this._router.navigate(['/']);
    
  }
}
