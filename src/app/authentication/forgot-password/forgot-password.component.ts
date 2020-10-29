import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/data/auth/auth.service';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


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
              private authService: AuthService
              ) { }

    ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email : ['', [Validators.email, Validators.required]],
    });
  }


  resetPassword() {
     this.authService.resetPassword(this.resetPasswordForm.value).subscribe( data => {
       console.log(data);
     });
}

}
