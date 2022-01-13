import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/data/auth/auth.service';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  sent = false;
  notSent = true;
  submitted = false;
  resetPasswordForm: FormGroup;
  constructor(
              private fb: FormBuilder,
              private router: Router,
              private notifyService: NotificationsService,
              private authService: AuthService
              ) { }

    ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      username : ['',  Validators.required],
    });
  }


  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.submitted = true;
      return;
    } else {

      this.authService.resetPassword(this.resetPasswordForm.value).subscribe( (data: any) => {
        // const data = JSON.parse(res);
        if ( data.hasErrors === true) {
         this.notifyService.publishMessages(data.errors, 'danger', 1);
        } else {
          // (data);
          this.notSent = false;
          this.sent = true;
       }
      });
    }
}

}
