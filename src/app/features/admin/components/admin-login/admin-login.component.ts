import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  private authStatusSub: Subscription;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.authStatusSub = this.adminService.getAuthenticatedListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    this.adminService.adminLogin(form.value.email, form.value.password);
    this.router.navigate(['/admin/products']);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
