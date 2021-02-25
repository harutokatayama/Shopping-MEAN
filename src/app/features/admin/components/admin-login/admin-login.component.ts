import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  isLoadingMode = true;
  isLoading = false;

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.adminService.adminLogin(email, password);

    form.reset();
    this.router.navigate(['/admin/products']);
  }

}
