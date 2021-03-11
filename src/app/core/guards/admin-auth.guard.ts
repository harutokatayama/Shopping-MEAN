import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { AdminService } from "../../features/admin/services/admin.service";

@Injectable()
export class AdminAuthGuard implements CanActivate {
    constructor(
        private adminService: AdminService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.adminService.getIsAuth();
        if (!isAuth) {
            this.router.navigate(['/admin/login']);
        }
        return isAuth;
    }
}
