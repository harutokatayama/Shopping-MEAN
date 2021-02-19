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
  isLoading = false;
  productCode = 'ZLFfW5Vh2Y28NQRu';
  private productsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(private adminProductsService: AdminProductsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.adminProductsService.getProducts();
  }

  onDelete() {
    this.isLoading = true;
    this.adminProductsService.deleteProduct().subscribe(() => {
      this.adminProductsService.getProducts();
    });
  }

  ngOnDestroy() {
    // this.productsSub.unsubscribe();
    // this.authStatusSub.unsubscribe();
  }

}
