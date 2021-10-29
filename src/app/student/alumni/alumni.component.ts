import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SchoolService } from 'src/services/data/school/school.service';

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit {
  studentDetails: any;
  schoolLogo: any;
  schoolname: any;

  constructor(
    private router: Router,
    private school: SchoolService
  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.studentDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.getSchoolProperties();
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/');
  }


  getSchoolProperties() {
    this.school.getSchoolLogo(this.studentDetails.TenantId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.paylaod);
        this.schoolLogo = data.payload.logo;
        sessionStorage.setItem('prop', this.schoolLogo);
        this.schoolname = data.payload.schoolName;
      }
    });
  }

}
