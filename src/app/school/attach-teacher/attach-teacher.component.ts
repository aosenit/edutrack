import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attach-teacher',
  templateUrl: './attach-teacher.component.html',
  styleUrls: ['./attach-teacher.component.css']
})
export class AttachTeacherComponent implements OnInit {
teacher = false;
emptyRecord = false;
  constructor() { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

  getStaffStatus(event: string) {
    if (event === 'yes') {
        this.teacher = true;
    } else {
      if (event === 'no') {
        this.teacher = false;
      }
    }
  }
}
