import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { SharedModule } from "src/app/shared/shared.module";
import { AdminEditProductsComponent } from "./components/admin-edit-products/admin-edit-products.component";
import { AdminPostProductsComponent } from "./components/admin-post-products/admin-post-products.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminRoutingModule } from "./admin-routing.module";

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

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
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatPaginatorModule
    ]
})
export class AdminModule {

}
