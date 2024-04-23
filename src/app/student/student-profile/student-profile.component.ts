import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/services/data/student/student.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  studentDetails: any;
  studentId: any;
  id: any;
  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.getStudentByID();
  }

  getStudentByID() {
    const helper = new JwtHelperService();
    this.studentId = helper.decodeToken(localStorage.getItem('access_token'));
    this.id = this.studentId.sub;
    this.studentService.getStudentProfile(this.id).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        this.studentDetails = data.payload;
      }
    }, error => {
      // (error);
    });
  }

}
