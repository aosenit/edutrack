import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SchoolService } from 'src/services/data/school/school.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
teacherslist: any;
  loggedInUser: any;
  hide = false;
  schoolLogo: any;
  schoolname: any;

  constructor(
    private teacherService: TeacherService,
    private notifyService: NotificationsService,
    private school: SchoolService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getAllteachers();
          const helper = new JwtHelperService();
          this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
          if ( this.loggedInUser.TeacherClassId === undefined || null) {
            this.hide = true;
          } else {
            this.hide = false;
          }
          this.getSchoolProperties();
  }


  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/');
  }


  getSchoolProperties() {
    this.school.getSchoolLogo(this.loggedInUser.TenantId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.paylaod);
        this.schoolLogo = data.payload.logo;
        sessionStorage.setItem('prop', this.schoolLogo);
        this.schoolname = data.payload.schoolName;
      }
    });
  }
  

  // getAllteachers() {
  //   this.teacherService.getAllTeachers().subscribe( (data: any) => {
  //     if (data.hasErrors === false) {
  //       console.log('all schools', data);
  //       this.teacherslist = data.payload;
  //     }
  //   }, error => {
  //     this.notifyService.publishMessages(error.errors, 'danger', 1);

  //   });
  // }

}
