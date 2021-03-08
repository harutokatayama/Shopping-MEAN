import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminPostProductsComponent } from "./components/admin-post-products/admin-post-products.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminSignupComponent } from "./components/admin-signup/admin-signup.component";
import { AdminUsersComponent } from "./components/admin-users/admin-users.component";
import { AdminComponent } from "./components/admin/admin.component";

const routes: Routes = [
  { path: '', component: AdminComponent ,
    children: [
      { path: 'login', component: AdminLoginComponent },
      { path: 'signup', component: AdminSignupComponent },
      { path: 'products', component: AdminProductsComponent },
      { path: 'post', component: AdminPostProductsComponent },
      { path: 'edit/:productId', component: AdminPostProductsComponent },
      { path: 'users', component: AdminUsersComponent }
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {

}
