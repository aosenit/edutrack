import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/services/data/student/student.service';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  studentDetails: any;

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getStudentByID();
  }

  getStudentByID() {
    const id = 6;
    this.studentService.getStudentById(id).subscribe((data: any) => {
      console.log('ssasasa', data);
      if (data.hasErrors === false ) {
        this.studentDetails = data.payload;
      }
    }, error => {
      console.log(error);
    });
  }
  id(id: any) {
    throw new Error('Method not implemented.');
  }

}
