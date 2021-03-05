import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/features/products/models/product.model';
import { AdminProductsService } from '../../services/admin-products.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-post-products',
  templateUrl: './admin-post-products.component.html',
  styleUrls: ['./admin-post-products.component.scss']
})
export class AdminPostProductsComponent implements OnInit, OnDestroy {
  enteredContent = '';
  isLoading = false;
  product: Product;
  form: FormGroup;
  imagePreview: string;
  private mode = 'create';
  private productId: string;
  private authStatusSub: Subscription;

  constructor(
    public adminProductsService: AdminProductsService,
    public route: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.adminProductsService.getProductUpdateListener().subscribe(
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
      weight: new FormControl(null, { validators: [Validators.required] }),
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
        this.adminProductsService.getProduct(this.productId).subscribe(productData => {
          this.isLoading = false;
          this.product = {
            id: productData._id,
            title: productData.title,
            price: productData.price,
            imagePath: productData.imagePath,
            description: productData.description,
            quantity: productData.quantity,
            weight: productData.weight,
            category: productData.category,
            country: productData.country,
            height: productData.height,
            width: productData.width
          };
          this.form.setValue({
            title: this.product.title,
            price: this.product.price,
            imagePath: this.product.imagePath,
            description: this.product.description,
            quantity: this.product.quantity,
            weight: this.product.weight,
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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSaveProduct() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.adminProductsService.addProduct(
        this.form.value.title,
        this.form.value.price,
        this.form.value.image,
        this.form.value.description,
        this.form.value.quantity,
        this.form.value.weight,
        this.form.value.category,
        this.form.value.country,
        this.form.value.height,
        this.form.value.width
      );
    } else {
      this.adminProductsService.updateProduct(
        this.productId,
        this.form.value.title,
        this.form.value.price,
        this.form.value.image,
        this.form.value.description,
        this.form.value.quantity,
        this.form.value.weight,
        this.form.value.category,
        this.form.value.country,
        this.form.value.height,
        this.form.value.width
      );
    }

    this.form.reset();
  }

  clearFormField(element: FormControl) {
    element.setValue(null);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
