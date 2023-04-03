import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  productForm!: FormGroup;
  constructor(private _fb: FormBuilder){
    this.productForm = this._fb.group({
      product:['', Validators.required],
      category:['', Validators.required],
      location:['', Validators.required],
      price:['', Validators.required]
    })
  }

  addProduct(){
    console.log(this.productForm.value);
  }
}
