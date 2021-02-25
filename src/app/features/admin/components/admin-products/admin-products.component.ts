import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AdminProductsService } from '../../services/admin-products.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,];
  productCode = 'ZLFfW5Vh2Y28NQRu';
  isLoadingMode = true;
  isLoading = false;
  totalProducts = 10;
  productsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private productsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(private adminProductsService: AdminProductsService) { }
  
  ngOnInit(): void {
    this.isLoading = true;
    // this.adminProductsService.getProducts(this.productsPerPage, this.currentPage);
    setTimeout(() => {
      this.isLoading = false;
    }, 0)
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.adminProductsService.deleteProduct(postId).subscribe(() => {
      this.adminProductsService.getProducts(this.productsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    // this.productsSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }

}
