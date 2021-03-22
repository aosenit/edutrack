import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AuthService } from 'src/services/data/auth/auth.service';
import { MustMatch } from 'src/services/utils/mustMatch';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  validationToken: any;
  resetPasswordForm: FormGroup;
  verificationUrl: any;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private notifyService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.verificationUrl = this.route.snapshot.queryParams;
    const {code} = this.verificationUrl;
    sessionStorage.setItem('tk', code);
    this.validationToken = sessionStorage.getItem('tk');
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  resetPassword() {
    const {password} = this.resetPasswordForm.value;
    const result = {
      token: this.validationToken,
      newPassword : password
    };
    console.log(result);
    this.auth.requestPasswordReset(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.notifyService.publishMessages(data.description, 'success', 1);
        this.router.navigateByUrl('/');
      }
    }, error => {
      console.log(error);
    });
}

}
