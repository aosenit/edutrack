import { Component, OnInit } from '@angular/core';
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
    private teacherService: TeacherService
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

}
