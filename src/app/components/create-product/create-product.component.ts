import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productForm!: FormGroup;
  title = 'Create Product';
  btnTxt = 'Create';
  id:string;

  constructor(private _fb: FormBuilder, private _router:Router,
    private toastr: ToastrService, private _productService:ProductService,
    private aRouter:ActivatedRoute){
      this.productForm = this._fb.group({
        name:['', Validators.required],
        category:['', Validators.required],
        location:['', Validators.required],
        price:['', Validators.required]
      });

      this.id = this.aRouter.snapshot.paramMap.get('id')!;
  }

  ngOnInit(){
    this.checkEdit();
  }

  checkEdit(){
    if(this.id!==null){
      this.title = 'Edit Product'; 
      this.getProduct(this.id);
      this.btnTxt = 'Update';
    }
  }

  addEditProduct(){
    const product : Product ={
      name:this.productForm.get('name')?.value,
      category: this.productForm.get('category')?.value,
      location: this.productForm.get('location')?.value,
      price: this.productForm.get('price')?.value
    }
    if(this.id!==null){
      this.updateProduct(this.id, product); 
      //console.log('edit');
      return;
    }
    //console.log('add');
    this.addNewProduct(product);    
  }

  updateProduct(id:string, product:Product){
    this._productService.updateProduct(id,product).subscribe({
      next:data=>{
        this.returnHome('Succesfully updated');
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  addNewProduct(product:Product){
    this._productService.addProduct(product).subscribe({
      next:data=>{
        this.returnHome('Succesfully added');
      },
      error:err=>{
        console.log(err);
      }
    });
  }

  getProduct(id:string){
    this._productService.getProduct(id).subscribe({
      next: data=>{
        this.productForm.setValue({
          name:data.name,
          category:data.category,
          location:data.location,
          price:data.price
        });
      },
      error: err=>{
        console.log(err);
      }
    });
  }

  returnHome(info:string){
    this.toastr.success(info, 'Product Information');
    this._router.navigate(['/']); 
  }
}
