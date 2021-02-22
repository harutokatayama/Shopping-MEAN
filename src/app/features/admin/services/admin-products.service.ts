import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../../products/product.model";

@Injectable({
    providedIn: 'root'
})
export class AdminProductsService {
    private products: Product[] = [];
    private productsUpdated = new Subject<{ products: Product[]; productCount: number }>();

    constructor(
        private http: HttpClient,
        private router: Router
    ) {}

    getProducts(productsPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${productsPerPage}&page=${currentPage}`;
        this.http
          .get<{ message: string, products: any, maxProducts: number }>(
            'http://localhost:3000/api/products/' + queryParams
          )
          .pipe(
              map(productData => {
                  return {
                      products: productData.products.map(product => {
                          return {
                              id: product._id,
                              title: product.title,
                              description: product.description,
                              imagePath: product.imagePath,
                              price: product.price,
                              quantity: product.quantity,
                              heavy: product.heavy,
                              category: product.category,
                              country: product.country,
                              height: product.height,
                              width: product.width
                          };
                      }),
                      maxProducts: productData.maxProducts
                  }
              })
          )
          .subscribe(transformedProductData => {
              this.productsUpdated = transformedProductData.products;
              this.productsUpdated.next({
                  products: [...this.products],
                  productCount: transformedProductData.maxProducts
              });
          });
    };

    getProductUpdateListener() {
        return this.productsUpdated.asObservable();
    };

    getProduct(id: string) {
        return this.http.get<{
            _id: string;
            title: string;
            price: number;
            description: string;
            category: string;
            country: string;
            imagePath: string;
            quantity: number;
            heavy: number;
            height: number;
            width: number;
        }>('http://localhost:3000/api/products/' + id);
    };

    addProduct(
        title: string,
        price: string,
        description: string,
        category: string,
        country: string,
        image: File,
        quantity: string,
        height: string,
        width: string,
    ) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('price', price);
        postData.append('description', description);
        postData.append('category', category);
        postData.append('country', country);
        postData.append('image', image);
        postData.append('quantity', quantity);
        postData.append('height', height);
        postData.append('width', width);
        this.http
          .post<{ message: string; product: Product }>(
            'http://localhost:3000/api/products/' ,
            postData
          )
          .subscribe(responseData => {
              this.router.navigate(['/']);
          });
    };

    updateProduct(
        id: string,
        title: string,
        price: string,
        description: string,
        category: string,
        country: string,
        image: File | string,
        quantity: string,
        heavy: string,
        height: string,
        width: string,
    ) {
        let productData: Product | FormData;
        if (typeof image === 'object') {
            productData = new FormData();
            productData.append('id', id);
            productData.append('title', title);
            productData.append('description', description);
            productData.append('image', image, title);
            productData.append('price', price);
            productData.append('category', category);
            productData.append('country', country);
            productData.append('quantity', quantity);
            productData.append('heavy', heavy);
            productData.append('height', height);
            productData.append('width', width);
        } else {
            productData = {
                id: id,
                title: title,
                description: description,
                imagePath: image,
                price: +price,
                category: category,
                country: country,
                quantity: +quantity,
                heavy: +heavy,
                height: +height,
                width: +width
            };
        }
        this.http
          .put('http://localhost:3000/api/products/' + id, productData)
          .subscribe(response => {
              this.router.navigate(['/']);
          });
    };

    deleteProduct(productId: string) {
        return this.http
          .delete('http://localhost:3000/api/admin/products/' + productId);
    };
}
