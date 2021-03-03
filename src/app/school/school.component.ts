import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  adminDetails: any;

  constructor(
    private router: Router,
    private notifyService: NotificationsService
    ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    console.log(this.adminDetails);

  }

  logOut() {
    localStorage.removeItem('access_token');
    setTimeout(() => {
      this.notifyService.publishMessages('Logged out successfully', 'success', 1);
      this.router.navigateByUrl('/');

    }, 2000);
  }

  getInitials(input) {
    const  names = input.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
}

}
