import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "../../products/models/product.model";

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
                  }
              })
          )
          .subscribe(transformedProductData => {
              this.products = transformedProductData.products;
              this.productsUpdated.next({
                  products: [...this.products],
                  productCount: transformedProductData.maxProducts
              });
          });
    };

    getProductUpdateListener() {
        return this.productsUpdated.asObservable();
    };

    getProductNinCurrentId(id: string) {
        this.http
          .get<{ message: string; products: any; maxProducts: number }>(
              'http://localhost:3000/api/products/nin/' + id
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
    };

    addProduct(
        title: string,
        price: string,
        image: File,
        description: string,
        quantity: string,
        weight: string,
        category: string,
        country: string,
        height: string,
        width: string,
    ) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('price', price);
        postData.append('image', image);
        postData.append('description', description);
        postData.append('quantity', quantity);
        postData.append('weight', weight);
        postData.append('category', category);
        postData.append('country', country);
        postData.append('height', height);
        postData.append('width', width);
        this.http
          .post<{ message: string; product: Product }>(
            'http://localhost:3000/api/products/' ,
            postData
          )
          .subscribe(responseData => {
              this.router.navigate(['/admin/products']);
          });
    };

    updateProduct(
        id: string,
        title: string,
        price: string,
        image: File | string,
        description: string,
        quantity: string,
        weight: string,
        category: string,
        country: string,
        height: string,
        width: string,
    ) {
        let productData: Product | FormData;
        if (typeof image === 'object') {
            productData = new FormData();
            productData.append('id', id);
            productData.append('title', title);
            productData.append('price', price);
            productData.append('image', image, title);
            productData.append('description', description);
            productData.append('quantity', quantity);
            productData.append('weight', weight);
            productData.append('category', category);
            productData.append('country', country);
            productData.append('height', height);
            productData.append('width', width);
        } else {
            productData = {
                id: id,
                title: title,
                price: +price,
                imagePath: image,
                description: description,
                quantity: +quantity,
                weight: +weight,
                category: category,
                country: country,
                height: +height,
                width: +width
            };
        }
        this.http
          .put('http://localhost:3000/api/products/' + id, productData)
          .subscribe(response => {
              this.router.navigate(['/admin/products']);
          });
    };

    deleteProduct(productId: string) {
        return this.http
          .delete('http://localhost:3000/api/products/' + productId);
    };
}
