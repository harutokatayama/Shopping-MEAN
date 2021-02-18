import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AdminEditProductsComponent } from "./components/admin-edit-products/admin-edit-products.component";
import { AdminPostProductsComponent } from "./components/admin-post-products/admin-post-products.component";
import { AdminProductsComponent } from "./components/admin-products/admin-products.component";
import { AdminComponent } from "./components/admin/admin.component";

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule } from "@angular/forms";
import { AdminHeaderComponent } from './components/admin-header/admin-header.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

@NgModule({
    declarations: [
        AdminComponent,
        AdminProductsComponent,
        AdminPostProductsComponent,
        AdminEditProductsComponent,
        AdminHeaderComponent,
        AdminLoginComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: AdminComponent ,
              children: [
                { path: 'login', component: AdminLoginComponent },
                { path: 'products', component: AdminProductsComponent },
                { path: 'post', component: AdminPostProductsComponent },
                { path: 'edit', component: AdminEditProductsComponent }
              ]
            }
        ]),
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatToolbarModule,
        SharedModule
    ]
})
export class AdminModule {

}
