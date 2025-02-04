import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/data/auth/auth.service';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  submitted = false;
  LoginForm: FormGroup;
  loggedInUser: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifyService: NotificationsService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.LoginForm = this.fb.group({
      username: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(5), Validators.required]],
    });

    // // (this.loggedInUser);

  }

  login() {
    if (this.LoginForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.authService.loginAdmin(this.LoginForm.value).subscribe((data: any) => {
        if (data) {
          localStorage.setItem('access_token', data.access_token);
          this.notifyService.publishMessages('Login successful', 'success', 1);

          const helper = new JwtHelperService();
          this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
          console.log(this.loggedInUser);
          

          if (this.loggedInUser.email === 'root@myschooltrack.com' || this.loggedInUser.email === 'tester@gmail.com') {
            this.router.navigateByUrl('/admin');
          } else if (this.loggedInUser.UserType === 'SchoolGroupManager') {
            this.router.navigateByUrl('/school-manager');
          } else {
            localStorage.removeItem('access_token');

            this.notifyService.publishMessages('Invalid details, please select the right login type', 'danger', 1);
            this.router.navigateByUrl('/');

          }
        } else {

          this.notifyService.publishMessages(data.errors, 'danger', 1);
        }
      },
        error => {
          this.notifyService.publishMessages(error.message, 'danger', 1);
        });
    }
  }

}
