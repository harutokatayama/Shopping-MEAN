import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {
  product: Product;
  isLoading = false;
  private productId: string;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.productId = paramMap.get('productId');
        this.isLoading = true;
        this.productsService.getProduct(this.productId).subscribe(productData => {
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
