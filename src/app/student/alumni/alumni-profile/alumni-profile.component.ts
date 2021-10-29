import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StudentService } from 'src/services/data/student/student.service';

@Component({
  selector: 'app-alumni-profile',
  templateUrl: './alumni-profile.component.html',
  styleUrls: ['./alumni-profile.component.css']
})
export class AlumniProfileComponent implements OnInit {
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
    // (this.id);
    this.studentService.getStudentProfile(27).subscribe((data: any) => {
      // ('ssasasa', data);
      if (data.hasErrors === false ) {
        this.studentDetails = data.payload;
      }
    }, error => {
      // (error);
    });
  }

}
