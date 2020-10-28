import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/data/auth/auth.service';
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
              private authService: AuthService,
              
              ) { }

    ngOnInit() {
    this.LoginForm = this.fb.group({
      username : ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  login() {
    if (this.LoginForm.invalid) {
      this.submitted = true;
      return;
    } else {
      console.log('login successful', this.LoginForm.value);
      this.authService.loginAdmin(this.LoginForm.value).subscribe( (data: any) => {
        if (data) {
          console.log(data);
          localStorage.setItem('access_token', data.access_token);
          this.notifyService.publishMessages('login successful', 'success', 1);
          this.router.navigateByUrl('/admin');
        }
      },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
        console.log('err', error);
      });
    }
  }

}
