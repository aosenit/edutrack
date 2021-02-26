import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AuthService } from 'src/services/data/auth/auth.service';

@Component({
  selector: 'app-parent-login',
  templateUrl: './parent-login.component.html',
  styleUrls: ['./parent-login.component.css']
})
export class ParentLoginComponent implements OnInit {
  submitted = false;
  parentLoginForm: FormGroup;
  loggedInUser: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifyService: NotificationsService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.parentLoginForm = this.fb.group({
      username : ['', Validators.required],
      password: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  submit() {
    if (this.parentLoginForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.authService.loginAdmin(this.parentLoginForm.value).subscribe((data: any) => {
        console.log(data);
        if (data) {
          localStorage.setItem('access_token', data.access_token);
          this.notifyService.publishMessages('Login successful', 'success', 1);

          const helper = new JwtHelperService();
          this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));

          if (this.loggedInUser.UserType === 'Parent') {
            this.router.navigateByUrl('/parent');
          } else {
            localStorage.removeItem('access_token');

            this.notifyService.publishMessages('Invalid details, please select the right login type', 'danger', 1);
            this.router.navigateByUrl('/');

          }
        }
      },
        error => {
          this.notifyService.publishMessages(error.message, 'danger', 1);
        });
      // location.reload();
    }
  }

}
