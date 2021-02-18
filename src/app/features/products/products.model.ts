import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { ProductsComponent } from "./components/products/products.component";

@NgModule({
    declarations: [
        ProductsComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: ProductsComponent },
        ]),
        CommonModule
    ]
})
export class ProductsModule {

}
