import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";

import { MyPageComponent } from "./components/my-page/my-page.component";
import { UserRoutingModule } from "./user-routing.model";

@NgModule({
    declarations: [
        MyPageComponent
    ],
    imports: [
        RouterModule,
        ReactiveFormsModule,
        UserRoutingModule,
        // SharedModule
    ]
})
export class UserModule {

}
