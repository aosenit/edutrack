import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/services/data/school/school.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import * as moment from 'moment';


@Component({
  selector: 'app-school-manager',
  templateUrl: './school-manager.component.html',
  styleUrls: ['./school-manager.component.css']
})
export class SchoolManagerComponent implements OnInit {
  searchString: string;
  adminDetails: any;
  schoolDetails: any;
  sessionList: any;
  currentTerm: any;
  constructor(
    private school: SchoolService,
    private assessmentService: AssessmentService

  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    // // (this.adminDetails);
    this.getSchoolProperties();
    this.getSession();
  }

  getSchoolProperties() {
    this.school.getSchoolLogo(this.adminDetails.TenantId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.paylaod);
        this.schoolDetails = data.payload;
      }
    });
  }

  getSession() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.sessionList = data.payload;
        const term: any = this.sessionList.terms;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < term.length; i++) {
          // (term[i]);
          if (term[i].isCurrent) {
            this.currentTerm  = term[i].name;

        }
      }}
    });
  }


}
