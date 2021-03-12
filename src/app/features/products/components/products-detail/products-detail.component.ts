import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit, OnDestroy {
  product: Product;
  products: Product[] = [];
  productsSub: Subscription;
  isLoading = false;
  userIsAuthenticated = false;
  private productId: string;
  private authStatusSub: Subscription;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.getProduct(paramMap);
        this.getProductNinCurrentId();
      } else {
        this.productId = null;
        // ここはまた後で決める
      }
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  getProduct(paramMap: ParamMap) {
    this.productId = paramMap.get('productId');
    this.isLoading = true;
    this.productsService.getProduct(this.productId).subscribe(productData => {
      // this.isLoading = false;
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
  }

  getProductNinCurrentId() {
    this.productsService.getProductNinCurrentId(this.productId);
    this.productsSub = this.productsService.getProductUpdatedListener()
      .subscribe((productData: { products: Product[], productCount: number }) => {
        this.isLoading = false;
        this.products = productData.products;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

}
