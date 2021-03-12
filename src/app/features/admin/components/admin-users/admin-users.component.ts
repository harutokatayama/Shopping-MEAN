import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { User } from 'src/app/features/user/models/user.model';
import { AdminUsersService } from '../../services/admin-users.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading = false;
  totalUsers = 10;
  usersPerPage = 10;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  private usersSub: Subscription;
  private authStatusSub: Subscription;
  
  constructor(
    private adminUsersService: AdminUsersService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  getUsers() {
    this.isLoading = true;
    this.adminUsersService.getUsers(this.usersPerPage, this.currentPage);
    this.usersSub = this.adminUsersService.getUserUpdateListener()
      .subscribe((userData: { users: User[], userCount: number }) => {
        this.isLoading = false;
        this.totalUsers = userData.userCount;
        this.users = userData.users;
      });
    this.userIsAuthenticated = this.adminService.getIsAuth();
    this.authStatusSub = this.adminService
      .getAuthenticatedListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.usersPerPage = pageData.pageSize;
    this.adminUsersService.getUsers(this.usersPerPage, this.currentPage);
  }

  onDelete(userId: string) {
    this.isLoading = true;
    this.adminUsersService.deleteUser(userId).subscribe(() => {
      this.adminUsersService.getUsers(this.usersPerPage, this.currentPage);
    }, () => {
      this.isLoading = false;
    });
  }

}
