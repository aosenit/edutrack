import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';


@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  adminDetails: any;
  schoolLogo: any;
  schoolname: any;
  year: Date = new Date();
  schoolColor: any;
  allowFinanceModule = false;
  subscriptionStatus: any;
  constructor(
    private router: Router,
    private notifyService: NotificationsService,
    private school: SchoolService
    ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.getSchoolProperties();

    if (this.adminDetails.UserType === 'SchoolAdmin') {
      this.allowFinanceModule = true;
    }
    const finance = [
      'FINANCE_CREATE',
      'FINANCE_READ',
      'FINANCE_UPDATE',
      'FINANCE_DELETE'
  ];
    if (this.adminDetails.Permission !== null || this.adminDetails.Permission !== undefined) {
      // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < finance.length; index++) {
      const element = finance[index];

      if (this.adminDetails.Permission.includes(element) && this.adminDetails.UserType === 'NonTeachingStaff') {
        this.allowFinanceModule = true;
      }
    }
    }


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

getSchoolProperties() {
  console.log('called')
  this.school.getSchoolLogo(this.adminDetails.TenantId).subscribe((data: any) => {
    if (data.hasErrors === false) {
      // (data.paylaod);
      this.schoolLogo = data.payload.logo;
      this.schoolColor = data.payload;
      sessionStorage.setItem('prop', this.schoolLogo);
      this.schoolname = data.payload.schoolName;
    }
  });
}





toggleSideBar() {
  // ('admin');
  const sidebar = document.querySelector('#sidebar');
  const content = document.querySelector('#content');
  sidebar.classList.toggle('sidebar');
  content.classList.toggle('content');
}

getYear() {
  return this.year.getFullYear();
}

}
