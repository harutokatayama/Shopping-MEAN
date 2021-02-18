import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.adminService.adminLogout();
  }

}
