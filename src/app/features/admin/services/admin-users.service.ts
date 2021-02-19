import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AdminUsersService {
    constructor(private http: HttpClient) {}

    getUsers() {
        this.http
          .get<{ message: string; users: any; maxProducts: number }>(
              'http://localhost:3000/api/users'
          )
          .pipe(
              map(userData => {

              })
          );
    }

    deleteUser() {
        return this.http
          .delete('http://localhost:3000/api/admin/users/');
    }
}
