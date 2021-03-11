import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import { NotificationComponent } from "src/app/shared/components/notification/notification.component";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {
    constructor(
        private snackBar: MatSnackBar,
        private zone: NgZone,
        private notification: NotificationComponent
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log('aa')
        console.log(request)
        return next.handle(request).pipe(
          tap(e => {
              this.zone.run(() => {
                if (request.method == "POST" || request.method == "PUT")
                if (e instanceof HttpResponse && e.status == 200) {
                  this.snackBar.open('Saved successfully.', 'close', { duration: 2000, panelClass: 'successSnack' });
                }
              })
          }),
          catchError(error => {
            this.snackBar.open('Error while saving.', 'close', { duration: 2000, panelClass: 'errorSnack' });
            return throwError(error);
          })
        );
    }

    // intercept(req: HttpRequest<any>, next: HttpHandler) {
    //     console.log(req)
    //     this.notification.openSnackBar('created!','Close','red-snackbar');
    //     return next.handle(req).pipe(
    //         tap((event: HttpEvent<any>) => {
    //             console.log(event);
    //             if (event instanceof HttpResponse && (event.status === 401 || event.status === 500)) {
    //                 // this.zone.run(() => {
    //                     // this.snackBar.openFromComponent(NotificationComponent, {
    //                     //     data: 'created!',
    //                     //     duration: 50000 
    //                     // });
    //                 // });
    //                 this.notification.openSnackBar('created!','Close','red-snackbar');
    //             }
    //         })
    //     );
    // }
}
