import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
teacherslist: any;

  constructor(
    private teacherService: TeacherService,
    private notifyService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getAllteachers();
  }


  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/');
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
