import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  submitted = false;
  resetPasswordForm: FormGroup;
  constructor(
              private fb: FormBuilder,
              private router: Router,
              private notifyService: NotificationsService,
              ) { }

    ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email : ['', [Validators.email, Validators.required]],
    });
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.submitted = true;
      return;
    } else {
      console.log('password reset successful', this.resetPasswordForm.value);
      this.notifyService.publishMessages('password reset successful', 'success', 1);

      this.router.navigateByUrl('/login');
    }
  }

}
