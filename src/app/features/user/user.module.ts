import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { SharedModule } from "src/app/shared/shared.module";
import { MyPageComponent } from "./components/my-page/my-page.component";
import { UserRoutingModule } from "./user-routing.model";
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EnterUserInfoComponent } from './components/enter-user-info/enter-user-info.component';
import { UserComponent } from './components/user/user.component';
import { AngularMaterialModule } from "src/app/angular-material.module";

@NgModule({
    declarations: [
        MyPageComponent,
        UserInfoComponent,
        EnterUserInfoComponent,
        UserComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        UserRoutingModule,
        SharedModule,
        AngularMaterialModule
    ]
})
export class UserModule {

}
