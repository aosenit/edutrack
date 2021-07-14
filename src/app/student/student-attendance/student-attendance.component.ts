import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/services/data/attendance/attendance.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  daysInWeek: any;
  studentDetails: any;
  attendanceList: any;
  classAttendanceList: any;


  constructor(
    private attendance: AttendanceService
  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.studentDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.getSubjectAttendanceForStudent();
    this.getClassAttendanceForStudent();
    this.daysofWeek();

  }

  daysofWeek() {
    this.daysInWeek = [
    { id: 0, day: 'Monday' },
    { id: 1, day: 'Tuesday' },
    { id: 2, day: 'Wednesday' },
    { id: 3, day: 'Thursday' },
    { id: 4, day: 'Friday' },
    ];
    // (this.daysInWeek);
  }

  getSubjectAttendanceForStudent() {
    this.attendance.getSubjectAttendance(this.studentDetails.sub).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.attendanceList = data.payload;
      }
    });
  }

  getClassAttendanceForStudent() {
    this.attendance.getClassAttendance(this.studentDetails.sub).subscribe((data: any) => {
      if (data.hasErrors === false) {
        const AttendanceList: any = data.payload;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < AttendanceList.length; i++) {
          // (AttendanceList[i]);
          this.classAttendanceList = AttendanceList[i].attendanceClassVms;
        }
      }
    });
  }

}
