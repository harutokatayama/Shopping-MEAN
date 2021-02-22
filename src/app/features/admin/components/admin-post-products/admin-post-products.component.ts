import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/features/products/product.model';
import { AdminProductsService } from '../../services/admin-products.service';

@Component({
  selector: 'app-admin-post-products',
  templateUrl: './admin-post-products.component.html',
  styleUrls: ['./admin-post-products.component.scss']
})
export class AdminPostProductsComponent implements OnInit {
  enteredContent = '';
  isLoading = false;
  product: Product;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private productId: string;
  private authStatusSub: Subscription;

  constructor(
    public route: ActivatedRoute,
    private adminProductService: AdminProductsService,
  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.adminProductService.getProductUpdateListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      quantity: new FormControl(null, { validators: [Validators.required] }),
      heavy: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl(null, { validators: [Validators.required] }),
      country: new FormControl(null, { validators: [Validators.required] }),
      height: new FormControl(null, { validators: [Validators.required] }),
      width: new FormControl(null, { validators: [Validators.required] }),
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.adminProductService.getProduct(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {
            id: productData._id,
            title: productData.title,
            description: productData.description,
            price: productData.price,
            imagePath: productData.imagePath,
            quantity: productData.quantity,
            heavy: productData.heavy,
            category: productData.category,
            country: productData.country,
            height: productData.height,
            width: productData.width
          };
          this.form.setValue({
            title: this.product.title,
            description: this.product.description,
            imagePath: this.product.imagePath,
            quantity: this.product.quantity,
            heavy: this.product.heavy,
            category: this.product.category,
            country: this.product.country,
            height: this.product.height,
            width: this.product.width
          });
        });
      } else {
        this.mode = 'create';
        this.productId = null;
      }
    });
  }

  onImagePicked() {

  }

  onSaveProduct() {

  }

}
