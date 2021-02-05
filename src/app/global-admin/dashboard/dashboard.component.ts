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
  studentCount: any;
  greet: any;
  p = 1;
  itemsPerPage = 5;

  constructor(private schoolService: SchoolService, private studentservice: StudentService) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.greeting();
    this.getAllSchool();
    this.getAllStudents();
  }

  getAllSchool() {
    this.schoolService.getAllSchools(this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data) {
        this.registeredSchools = data.payload;
        this.schoolCount = data.totalCount;
        console.log(this.registeredSchools);
      }
    });
  }

  getAllStudents() {
    this.studentservice.getAllStudents(this.p, this.itemsPerPage).subscribe(
      (res: any) => {
        this.studentCount = res.totalCount;
        console.log(this.studentCount);
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
