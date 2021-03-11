import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    templateUrl: './notification.component.html'
})
export class NotificationComponent {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string }, private snackBar: MatSnackBar) {}

    openSnackBar(message: string, action: string, className: string) {

        this.snackBar.open(message, action, {
         duration: 2000,
         verticalPosition: 'top',
         horizontalPosition: 'end',
         panelClass: [className],
       });
    }
}
