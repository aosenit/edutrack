import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/services/data/school/school.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-school-manager',
  templateUrl: './school-manager.component.html',
  styleUrls: ['./school-manager.component.css']
})
export class SchoolManagerComponent implements OnInit {
  searchString: string;
  adminDetails: any;
  schoolDetails: any;
  constructor(
    private school: SchoolService

  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    // console.log(this.adminDetails);
    this.getSchoolProperties();
  }

  getSchoolProperties() {
    this.school.getSchoolLogo(this.adminDetails.TenantId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.paylaod);
        this.schoolDetails = data.payload;
      }
    });
  }
  

}
