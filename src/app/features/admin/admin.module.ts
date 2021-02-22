import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
import { AdminEditProductsComponent } from "./components/admin-edit-products/admin-edit-products.component";
import { AdminPostProductsComponent } from "./components/admin-post-products/admin-post-products.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { AngularMaterialModule } from "src/app/angular-material.module";

@NgModule({
    declarations: [
        AdminComponent,
        AdminProductsComponent,
        AdminPostProductsComponent,
        AdminEditProductsComponent,
        AdminHeaderComponent,
        AdminLoginComponent,
        AdminUsersComponent
    ],
    imports: [
        RouterModule,
        AdminRoutingModule,
        CommonModule,
        FormsModule,
        SharedModule,
        AngularMaterialModule,
        ReactiveFormsModule
    ]
})
export class AdminModule {

}
