import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../../user/models/user.model";

@Injectable({
    providedIn: 'root'
})
export class AdminUsersService {
    private users: User[] = [];
    private usersUpdated = new Subject<{ users: User[]; userCount: number }>();

    constructor(private http: HttpClient) {}

    getUsers(usersPerPage: number, currentPage: number) {
        const queryParams = `?pagesize=${usersPerPage}&page=${currentPage}`;
        this.http
          .get<{ message: string; users: any; maxUsers: number }>(
              'http://localhost:3000/api/admin/users/' + queryParams
          )
          .pipe(
              map(userData => {
                  return {
                      users: userData.users.map(user => {
                          return {
                              id: user._id,
                              email: user.email,
                              password: user.password
                          };
                      }),
                      maxUsers: userData.maxUsers
                  }
              })
          )
          .subscribe(transformedUserData => {
              this.users = transformedUserData.users;
              this.usersUpdated.next({
                  users: [...this.users],
                  userCount: transformedUserData.maxUsers
              });
          });
    }

    getUserUpdateListener() {
        return this.usersUpdated.asObservable();
    }

    deleteUser(userId: string) {
        return this.http
          .delete('http://localhost:3000/api/admin/users/' + userId);
    }
}
