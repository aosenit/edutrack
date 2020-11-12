import { Component, OnInit } from '@angular/core';
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
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.getAllteachers();
  }


  getAllteachers() {
    this.teacherService.getAllTeachers().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        console.log('all schools', data);
        this.teacherslist = data.payload;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

}
