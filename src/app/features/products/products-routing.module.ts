import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductsDetailComponent } from "./components/products-detail/products-detail.component";

import { ProductsComponent } from "./components/products/products.component";

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'detail/:productId', component: ProductsDetailComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule {

}
