import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { AuthComponent } from "./components/auth/auth.component";

//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports: [
        RouterModule.forChild([
            { path: '', component: AuthComponent }
        ]),
        CommonModule,
        FormsModule,
        SharedModule,
        MatButtonModule
    ],
})
export class AuthModule {

}
