import { Injectable, OnInit } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AdminService implements OnInit {
    adminLoggedIn = false;

    ngOnInit() {
        
    }

    adminLogin() {
        this.adminLoggedIn = true;
    }

    adminLogout() {
        this.adminLoggedIn = false;
    }
}
