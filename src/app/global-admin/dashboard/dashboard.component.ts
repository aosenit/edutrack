import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SchoolService } from 'src/services/data/school/school.service';
import { StudentService } from 'src/services/data/student/student.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  adminDetails: any;
  registeredSchools: any;
  schoolCount: any;
  studentsOnPlatform: any;
  studentCount: any;
  greet: any;
  p = 1;
  itemsPerPage = 5;
  loginDate: string;

  constructor(private schoolService: SchoolService, private studentservice: StudentService) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.loginDate =  this.adminDetails.last_login_time + ' ' + 'UTC';

    this.greeting();
    this.getAllSchool();
    // this.getAllStudents();
    this.getTotalUsersOnPlatform()
  }

  getAllSchool() {
    this.schoolService.getAllSchools(this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data) {
        this.registeredSchools = data.payload;
        this.schoolCount = data.totalCount;
      }
    });
  }

  getAllStudents() {
    this.studentservice.getAllStudents(this.p, this.itemsPerPage).subscribe(
      (res: any) => {
        this.studentCount = res.totalCount;
        
      }
    );
  }
  getTotalUsersOnPlatform(){
    this.studentservice.getTotalUsersOnPlatform().subscribe(
      (res: any) => {
        this.studentsOnPlatform = res.payload.totalStudents   
      }
    );
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
