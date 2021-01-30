import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/services/data/auth/auth.service';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.css']
})
export class EmailVerifiedComponent implements OnInit {
  initialMessage = true;
  successMessage = false;
  verificationUrl: any;
  userId: any;
  userCode: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.verificationUrl = this.route.snapshot.queryParams;
    console.log(this.verificationUrl);
    const {userId, code} = this.verificationUrl;
    this.userId = userId;
    this.userCode = code;
    console.log('user id', this.userId);
    console.log('user cdde', this.userCode);
    this.veryifyUserEmail();
  }


  veryifyUserEmail() {
    this.authService.verifyUserEmail(this.userId, this.userCode).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log('emial verification good', data.payload);
      } else {
        console.log(data)
      }
    }, error => {
      console.log(error.error);
    });
  }

}
