import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MyPageComponent } from "./components/my-page/my-page.component";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { EnterUserInfoComponent } from "./components/enter-user-info/enter-user-info.component";
import { UserComponent } from "./components/user/user.component";
import { CartComponent } from "./components/cart/cart.component";


const routes: Routes = [
    { path: '', component: UserComponent ,
      children: [
          { path: 'my-page', component: MyPageComponent },
          { path: 'info', component: UserInfoComponent },
          { path: 'enter-info', component: EnterUserInfoComponent },
          { path: 'cart', component: CartComponent }
      ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}
