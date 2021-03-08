import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
import { AdminPostProductsComponent } from "./components/admin-post-products/admin-post-products.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminRoutingModule } from "./admin-routing.module";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { AdminSignupComponent } from './components/admin-signup/admin-signup.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdminProductsComponent,
        AdminPostProductsComponent,
        AdminHeaderComponent,
        AdminLoginComponent,
        AdminUsersComponent,
        AdminSignupComponent
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
