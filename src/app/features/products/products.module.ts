import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { SharedModule } from "src/app/shared/shared.module";

import { ProductsComponent } from "./components/products/products.component";

@NgModule({
    declarations: [
        ProductsComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: ProductsComponent },
        ]),
        CommonModule,
        SharedModule,
        AngularMaterialModule
    ]
})
export class ProductsModule {

}
