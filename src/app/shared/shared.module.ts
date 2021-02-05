import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./components/loading-spinner/loading-spinner.component";

@NgModule({
    declarations: [
        LoadingSpinnerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent
    ],
    // entryComponents: [

    // ]
})
export class SharedModule {

}
