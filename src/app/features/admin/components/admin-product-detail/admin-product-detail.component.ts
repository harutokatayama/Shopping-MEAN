import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/features/products/models/product.model';
import { AdminProductsService } from '../../services/admin-products.service';

@Component({
  selector: 'app-admin-product-detail',
  templateUrl: './admin-product-detail.component.html',
  styleUrls: ['./admin-product-detail.component.scss']
})
export class AdminProductDetailComponent implements OnInit {
  isLoading = false;
  product: Product;
  private productId: string;
  private authStatusSub: Subscription;

  constructor(
    public adminProductsService: AdminProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
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
          }
        });
      } else {
        this.productId = null;
        // ここはまた後で決める
      }
    });
  }
  
}
