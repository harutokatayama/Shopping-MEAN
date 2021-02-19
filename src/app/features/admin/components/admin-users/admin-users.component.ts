import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminUsersService } from '../../services/admin-users.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  users = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ];
  isLoading = false;
  private usersSub: Subscription;
  
  constructor(private adminUsersService: AdminUsersService) { }

  ngOnInit(): void {
    this.isLoading = true;
    // this.users = this.adminService.getUsers();
  }

  onDelete() {
    this.isLoading = true;
    this.adminUsersService.deleteUser().subscribe(() => {
      this.adminUsersService.getUsers();
    });
  }

  ngOnDestroy() {
    // this.usersSub.unsubscribe();
  }

}
