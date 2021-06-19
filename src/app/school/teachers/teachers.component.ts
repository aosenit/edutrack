import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
teachersList: any;
searchString: string;

  constructor(
    private teacherService: TeacherService,
    private notifyService: NotificationsService,
    private router: Router

  ) { }

  ngOnInit() {
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teachersList = data.payload;
        console.log(this.teachersList);
      }
    });
  }

  editTeacher(id) {
    // this.notifyService.publishMessages('Service currently down', 'danger', 1);

    this.teacherService.getTeacherById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        sessionStorage.setItem('all-employee-info', JSON.stringify(data.payload));
        console.log(this.teachersList);
        this.router.navigateByUrl('/school/edit-employee/' + id);

      }
    });
  }

  deleteTeacher(id) {
    this.notifyService.publishMessages('Service currently down', 'danger', 1);

    // this.teacherService.getTeacherById(id).subscribe((data: any) => {
    //   if (data.hasErrors === false) {
    //     sessionStorage.setItem('all-teacher-info', JSON.stringify(data.payload));
    //     console.log(this.teachersList);
    //   }
    // });
  }

}
