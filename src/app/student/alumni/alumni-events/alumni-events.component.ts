import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlumniService } from 'src/services/data/alumni/alumni.service';
import { SchoolService } from 'src/services/data/school/school.service';

@Component({
  selector: 'app-alumni-events',
  templateUrl: './alumni-events.component.html',
  styleUrls: ['./alumni-events.component.css']
})
export class AlumniEventsComponent implements OnInit {
  eventLists: any;
  studentDetails: any;
  schoolname: any;

  constructor(
    private alumni: AlumniService,
    private school: SchoolService

  ) { }

  ngOnInit() {
    this.getAllAlumiEvents();
    const helper = new JwtHelperService();
    this.studentDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.getSchoolProperties();
  }

  getAllAlumiEvents() {
    this.alumni.getAllEvents().subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.eventLists = res.payload;
      }
    });
  }

  getSchoolProperties() {
    this.school.getSchoolLogo(this.studentDetails.TenantId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.paylaod);
        this.schoolname = data.payload.schoolName;
      }
    });
  }

}
