import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  login = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (this.router.url === '/user') {
      this.router.navigate(['/user/my-page']);
    }
  }

}
