import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subjec-attendance',
  templateUrl: './subjec-attendance.component.html',
  styleUrls: ['./subjec-attendance.component.css']
})
export class SubjecAttendanceComponent implements OnInit {
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
