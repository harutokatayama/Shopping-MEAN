import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoadingMode = true;
  isLoading = false;
  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2500);

    form.reset();
  }

}
