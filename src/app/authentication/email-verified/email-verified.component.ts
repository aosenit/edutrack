import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AuthService } from 'src/services/data/auth/auth.service';

@Component({
  selector: 'app-email-verified',
  templateUrl: './email-verified.component.html',
  styleUrls: ['./email-verified.component.css']
})
export class EmailVerifiedComponent implements OnInit {
  initialMessage = true;
  successMessage = false;
  // messageDescription: any;
  verificationUrl: any;
  userId: any;
  userCode: any;
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private notifyService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.verificationUrl = this.route.snapshot.queryParams;
    const {userId, code} = this.verificationUrl;
    this.userId = userId;
    this.userCode = code;
    if (this.userId === undefined) {
      this.initialMessage = true;
    } else {

      this.veryifyUserEmail();
    }
  }


  veryifyUserEmail() {
    this.authService.verifyUserEmail(this.userId, this.userCode).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        // console.log('emial verification good', data.payload);
        // this.messageDescription = data.description;
        sessionStorage.setItem('tk', data.payload);
        this.successMessage = true;
        this.initialMessage = false;
        setTimeout(() => {
          this.router.navigateByUrl('/reset-password');
        }, 2000);
      } else {
        console.log(data);
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);

    });
  }

}
