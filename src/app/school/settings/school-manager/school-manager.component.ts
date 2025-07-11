import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/services/data/school/school.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import * as moment from 'moment';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';


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
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,

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
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

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
