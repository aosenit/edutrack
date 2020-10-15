import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  submitted = false;
  LoginForm: FormGroup;
  constructor(
              private fb: FormBuilder,
              private router: Router,
              private notifyService: NotificationsService,
              ) { }

    ngOnInit() {
    this.LoginForm = this.fb.group({
      email : ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  login() {
    if (this.LoginForm.invalid) {
      this.submitted = true;
      return;
    } else {
      console.log('login successful', this.LoginForm.value);
      this.notifyService.publishMessages('login successful', 'success', 1);

      this.router.navigateByUrl('/admin');
    }
  }

}
