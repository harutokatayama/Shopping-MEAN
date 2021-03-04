import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";

import { Product } from "../product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    private products: Product[] = [];
    private productsUpdated = new Subject<{ products: Product[]; productCount: number }>();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getProducts(productsPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
        this.http
          .get<{ message: string; products: any; maxProducts: number }>(
            'http://localhost:3000/api/products/' + queryParams
          )
          .pipe(
              map(productData => {
                  return {
                      products: productData.products.map(product => {
                          return {
                            id: product._id,
                            title: product.title,
                            price: product.price,
                            imagePath: product.imagePath,
                            description: product.description,
                            quantity: product.quantity,
                            weight: product.weight,
                            category: product.category,
                            country: product.country,
                            height: product.height,
                            width: product.width
                          };
                      }),
                      maxProducts: productData.maxProducts
                  };
              })
          )
          .subscribe(transformedProductData => {
              this.products = transformedProductData.products;
              this.productsUpdated.next({
                  products: [...this.products],
                  productCount: transformedProductData.maxProducts
              });
          });
    }

    getProductUpdatedListener() {
        return this.productsUpdated.asObservable();
    }
    
    getProduct(id: string) {
        return this.http.get<{
            _id: string;
            title: string;
            price: number;
            imagePath: string;
            description: string;
            quantity: number;
            weight: number;
            category: string;
            country: string;
            height: number;
            width: number;
        }>('http://localhost:3000/api/products/' + id);
    }

}
