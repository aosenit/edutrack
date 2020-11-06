import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SchoolService } from 'src/services/data/school/school.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  adminDetails: any;
  registeredSchools: any;
  schoolCount: any;

  constructor(private schoolService: SchoolService) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.getAllSchool();
  }

  getAllSchool() {
    this.schoolService.getAllSchools().subscribe((data: any) => {
      if (data) {
        this.registeredSchools = data.payload;
        this.schoolCount = data.totalCount;
      }
    });
  }

}
