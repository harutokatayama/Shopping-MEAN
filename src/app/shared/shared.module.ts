import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularMaterialModule } from "../angular-material.module";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        CarouselComponent,
    ],
    imports: [
        CommonModule,
        AngularMaterialModule
    ],
    exports: [
        LoadingSpinnerComponent,
        CarouselComponent,
    ],
    // entryComponents: [

    // ]
})
export class SharedModule {

}
