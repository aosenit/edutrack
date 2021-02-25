import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-attendance',
  templateUrl: './class-attendance.component.html',
  styleUrls: ['./class-attendance.component.css']
})
export class ClassAttendanceComponent implements OnInit {
  noClass = false;
  displayClass = true;
  constructor() { }

  ngOnInit() {
  }

  getSubjectsId(id) {
    console.log('Subject ID here', id);
    // this.Subjectid = id;
    this.noClass = false;
    this.displayClass = true;
  }

}
