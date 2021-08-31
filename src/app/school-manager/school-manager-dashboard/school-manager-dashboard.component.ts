import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { StudentService } from 'src/services/data/student/student.service';

@Component({
  selector: 'app-school-manager-dashboard',
  templateUrl: './school-manager-dashboard.component.html',
  styleUrls: ['./school-manager-dashboard.component.css']
})
export class SchoolManagerDashboardComponent implements OnInit {
  adminDetails: any;
  registeredSchools: any;
  schoolCount: any;
  studentCount: any;
  greet: any;
  p = 1;
  itemsPerPage = 5;
  loginDate: string;

  constructor(
    private schoolService: SchoolService,
    private studentservice: StudentService,
    private notifyService: NotificationsService
    ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.loginDate =  this.adminDetails.last_login_time + ' ' + 'UTC';

    this.greeting();
    this.getAllSchool();
  }

  getAllSchool() {
    this.schoolService.getAllGroupsInASchool(this.p, this.itemsPerPage, this.adminDetails.SchGroupId).subscribe((data: any) => {
      if (data) {
        this.registeredSchools = data.payload;
        // this.clientList.reverse();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  switchSwitch(id) {
    this.schoolService.getSchoolGroupAnalytics(id).subscribe( (data: any) => {
      if (data) {
        this.schoolCount = data.payload.studentsCount;
        // this.clientList.reverse();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getSelectedSchoolInfo() {
    this.schoolService.getAllGroupsInASchool(this.p, this.itemsPerPage, this.adminDetails.SchGroupId).subscribe((data: any) => {
      if (data) {
        this.registeredSchools = data.payload;
        this.schoolCount = data.totalCount;
        // this.clientList.reverse();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
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



  // getSchoolGroupByItsId
}
