import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AuthService } from 'src/services/data/auth/auth.service';
import { SchoolService } from 'src/services/data/school/school.service';


@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})
export class TeacherLoginComponent implements OnInit {

  submitted = false;
  teacherLoginForm: FormGroup;
  loggedInUser: any;
  subdomain: string;
  matchedSchoolDetail: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifyService: NotificationsService,
    private authService: AuthService,
    private schoolService: SchoolService

  ) { }

  ngOnInit() {
    this.subdomain = localStorage.getItem('sub-domain');
    this.detectSchoolDomain();
    this.teacherLoginForm = this.fb.group({
      username : ['', Validators.required],
      password: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  detectSchoolDomain() {

    this.schoolService.getSchoolDomainName(this.subdomain).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.matchedSchoolDetail = data.payload;
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);
        setTimeout(() => {
          // this.router.navigateByUrl('/');

        }, 2000);
      }
    }, error => {
      this.notifyService.publishMessages('School doesnt exist', 'danger', 1);

    });

  }

  submit() {
    if (this.teacherLoginForm.invalid) {
      this.submitted = true;
      return;
    } else {
      this.authService.loginAdmin(this.teacherLoginForm.value).subscribe((data: any) => {
        if (data) {
          localStorage.setItem('access_token', data.access_token);
          this.notifyService.publishMessages('Login successful', 'success', 1);

          const helper = new JwtHelperService();
          this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));

          if (this.loggedInUser.UserType === 'TeachingStaff') {
            this.router.navigateByUrl('/teacher');
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
