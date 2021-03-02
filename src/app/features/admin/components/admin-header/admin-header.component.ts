import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit, OnDestroy {
  adminUserIsAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminUserIsAuthenticated = this.adminService.getIsAuth();
    this.authListenerSub = this.adminService
      .getAuthenticatedListener()
      .subscribe(isAuthenticated => {
        this.adminUserIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.adminService.adminLogout();
  }

  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

}
