import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminAuthGuard } from "../../core/guards/admin-auth.guard";

import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminPostProductsComponent } from "./components/admin-post-products/admin-post-products.component";
import { AdminProductDetailComponent } from "./components/admin-product-detail/admin-product-detail.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminSignupComponent } from "./components/admin-signup/admin-signup.component";
import { AdminUsersComponent } from "./components/admin-users/admin-users.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  { path: '', component: AdminComponent ,
    children: [
      { path: 'login', component: AdminLoginComponent },
      { path: 'signup', component: AdminSignupComponent, canActivate: [AdminAuthGuard] },
      { path: 'products', component: AdminProductsComponent, canActivate: [AdminAuthGuard],
        children: [
          { path: ':productId', component: AdminProductDetailComponent, canActivate: [AdminAuthGuard] },
        ]},
      { path: 'post', component: AdminPostProductsComponent },
      { path: 'edit/:productId', component: AdminPostProductsComponent, canActivate: [AdminAuthGuard] },
      { path: 'users', component: AdminUsersComponent, canActivate: [AdminAuthGuard] }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [AdminAuthGuard]
})
export class AdminRoutingModule {

}
