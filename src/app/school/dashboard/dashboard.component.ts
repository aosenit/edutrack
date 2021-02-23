import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  greet: string;
  adminDetails: any;
  loginDate: any;

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.loginDate =  this.adminDetails.last_login_time + ' ' + 'UTC';

    this.greeting();
  }

  greeting() {
    const myDate = new Date();
    const hrs = myDate.getHours();


    if (hrs < 12) {
      this.greet = 'Good Morning';
    } else if (hrs >= 12 && hrs <= 17) {
      this.greet = 'Good Afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      this.greet = 'Good Evening';
    }
  }
}
