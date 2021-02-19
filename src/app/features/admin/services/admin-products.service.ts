import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AdminProductsService {
    constructor(
        private http: HttpClient
    ) {}

    getProducts() {
        // this.http
        //   .get<{ message: string; posts: any; maxPosts: number; }>(
        //       'http://localhost:3000/api/products'
        //   )
        //   .pipe(
        //       map(productData => {
        //           return {
        //               products: productData
        //           };
        //       })
        //   )
        //   .subscribe(transformedProductData => {

        //   });
    }

    getProductUpdateListener() {

    }

    getProduct(id: string) {
        return this.http.get<{
            _id: string;
            name: string;
            price: number;
            description: string;
            category: string;
            type: string;
            country: string;
            creator: string;
            imagePath: string;
            quantity: number;
            height: number;
            width: number;
            onSale: boolean;
        }>('http://localhost:3000/api/products/' + id);
    }

    addProduct(
        name: string,
        price: number,
        description: string,
        category: string,
        type: string,
        country: string,
        creator: string,
        image: File,
        quantity: number,
        height: number,
        width: number,
        onSale: boolean,
        watchList: number
    ) {
        const addData = new FormData();
        addData.append('name', name);
        // addData.append('price', price);
        addData.append('description', description);
        addData.append('category', category);
        addData.append('type', type);
        addData.append('country', country);
        addData.append('creator', creator);
        addData.append('image', image);
        // addData.append('quantity', quantity);
        // addData.append('height', height);
        // addData.append('width', width);
        // addData.append('onSale', onSale);
        // addData.append('watchList', watchList);
    }

    updateProduct(
        id: string,
        name: string,
        price: number,
        description: string,
        category: string,
        type: string,
        country: string,
        creator: string,
        image: File | string,
        quantity: number,
        height: number,
        width: number,
        onSale: boolean,
        watchList: number
    ) {

    }

    deleteProduct() {
        return this.http
          .delete('http://localhost:3000/api/admin/products/');
    }
}
