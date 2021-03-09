import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/services/data/attendance/attendance.service';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.css']
})
export class StudentAttendanceComponent implements OnInit {
  daysInWeek: any;

  constructor(
    private attendance: AttendanceService
  ) { }

  ngOnInit() {
    this.getSubjectAttendance();
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
    console.log(this.daysInWeek);
  }

  getSubjectAttendance() {
    this.attendance.getSubjectAttendance().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
      }
    });
  }

}
