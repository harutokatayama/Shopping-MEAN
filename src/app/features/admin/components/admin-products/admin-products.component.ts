import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/features/products/models/product.model';
import { AdminProductsService } from '../../services/admin-products.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  productCode = 'ZLFfW5Vh2Y28NQRu';
  isLoading = false;
  totalProducts = 10;
  productsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  private productsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    private adminProductsService: AdminProductsService,
    private adminService: AdminService
  ) { }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.adminProductsService.getProducts(this.productsPerPage, this.currentPage);
    this.productsSub = this.adminProductsService.getProductUpdateListener()
      .subscribe((productData: { products: Product[], productCount: number }) => {
        this.isLoading = false;
        this.totalProducts = productData.productCount;
        this.products = productData.products;
        console.log(this.products);
      });
    this.userIsAuthenticated = this.adminService.getIsAuth();
    this.authStatusSub = this.adminService
      .getAuthenticatedListener()
      .subscribe(iaAuthenticated => {
        this.userIsAuthenticated = this.userIsAuthenticated
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.productsPerPage = pageData.pageSize;
    this.adminProductsService.getProducts(this.productsPerPage, this.currentPage)
  }

  onDelete(productId: string) {
    this.isLoading = true;
    this.adminProductsService.deleteProduct(productId).subscribe(() => {
      this.adminProductsService.getProducts(this.productsPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
