import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";

import { SharedModule } from "src/app/shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SignupComponent } from './components/signup/signup.component';

//Angular Material
import { MatButtonModule } from '@angular/material/button';
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        RouterModule,
        AuthRoutingModule,
        CommonModule,
        FormsModule,
        SharedModule,
        MatButtonModule,
        ReactiveFormsModule
    ],
})
export class AuthModule {

}
