import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AdminAuthData } from "../models/admin-auth.model";

@Injectable({
    providedIn: 'root'
})
export class AdminService implements OnInit {
    
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private authStatusListener = new Subject<boolean>();

    constructor(
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() {
        
    }

    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getAuthenticatedListener() {
        return this.authStatusListener.asObservable();
    }

    adminLogin(email: string, password: string) {
        const adminAuthData: AdminAuthData = { email: email, password: password };
        this.http.post<{ token: string; expiresIn: number; }>('http://localhost:3000/api/admin/login', adminAuthData)
          .subscribe(response => {
              const token = response.token;
              this.token = token;
              if (token) {
                  const expiresInDuration = response.expiresIn;
                  this.setAuthTimer(expiresInDuration);
                  this.isAuthenticated = true;
                  this.authStatusListener.next(true);
                  const now = new Date();
                  const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                  this.saveAuthData(token, expirationDate);
                  this.router.navigate(['/admin']);
              }
          });
    }

    adminLogout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.adminLogout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    }
}
