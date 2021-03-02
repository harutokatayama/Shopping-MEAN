import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "../../auth/auth-data.model";
import { AdminAuthData } from "../models/admin-auth.model";

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private adminUserId: string;
    private authStatusListener = new Subject<boolean>();

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthenticatedListener() {
        return this.authStatusListener.asObservable();
    }

    adminCreateUser(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http.post('http://localhost:3000/api/admin/signup', authData)
          .subscribe(() => {
              this.router.navigate(['/admin/products']);
          }, error => {
              this.authStatusListener.next(false);
          });
    }

    adminLogin(email: string, password: string) {
        const adminAuthData: AdminAuthData = { email: email, password: password };
        this.http.post<{ token: string; expiresIn: number; adminUserId: string }>('http://localhost:3000/api/admin/login', adminAuthData)
          .subscribe(response => {
              const token = response.token;
              this.token = token;
              if (token) {
                  const expiresInDuration = response.expiresIn;
                  this.setAuthAdminTimer(expiresInDuration);
                  this.isAuthenticated = true;
                  this.adminUserId = response.adminUserId;
                  this.authStatusListener.next(true);
                  const now = new Date();
                  const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                  this.saveAuthAdminData(token, expirationDate, this.adminUserId);
                  this.router.navigate(['/admin/products']);
              }
          });
    }

    autoAuthAdminUser() {
        const authInformation = this.getAuthAdminData();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.adminUserId = authInformation.adminUserId;
            this.setAuthAdminTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    adminLogout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.adminUserId = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/admin/login']);
    }

    private setAuthAdminTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.adminLogout();
        }, duration * 1000);
    }

    private saveAuthAdminData(token: string, expirationDate: Date, adminUserId: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('adminUserId', adminUserId);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('adminUserId');
    }

    private getAuthAdminData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const adminUserId = localStorage.getItem('adminUserId');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            adminUserId: adminUserId
        }
    }
}
