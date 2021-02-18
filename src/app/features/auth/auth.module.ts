import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";

import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule } from "@angular/forms";
import { SignupComponent } from './components/signup/signup.component';

//Angular Material
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent }
        ]),
        CommonModule,
        FormsModule,
        SharedModule,
        MatButtonModule
    ],
})
export class AuthModule {

}
