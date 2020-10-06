import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-settings',
  templateUrl: './school-settings.component.html',
  styleUrls: ['./school-settings.component.css']
})
export class SchoolSettingsComponent implements OnInit {

  level = true;
  class = false;
  arm = false;
  subject = false;
  mail = false;
  constructor() { }

  ngOnInit() {
  }

  // showLevel() {
  //   this.level = true;
  //   this.class = false;
  //   this.arm = false;
  //   this.subject = false;
  //   this.mail = false;
  // }

  // showClass() {
  //   this.level = false;
  //   this.class = true;
  //   this.arm = false;
  //   this.subject = false;
  //   this.mail = false;
  // }

  // showArm() {
  //   this.level = false;
  //   this.class = false;
  //   this.arm = true;
  //   this.subject = false;
  //   this.mail = false;
  // }

  // showSubject() {
  //   this.level = false;
  //   this.class = false;
  //   this.arm = false;
  //   this.subject = true;
  //   this.mail = false;
  // }

  // showMail() {
  //   this.level = false;
  //   this.class = false;
  //   this.arm = false;
  //   this.subject = false;
  //   this.mail = true;
  // }

  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus ) {

      case 'level':
          this.level = true;
          this.class = false;
          this.arm = false;
          this.subject = false;
          this.mail = false;
          break;


      case 'class':
          this.level = false;
          this.class = true;
          this.arm = false;
          this.subject = false;
          this.mail = false;
          break;

      case 'arm':
          this.level = false;
          this.class = false;
          this.arm = true;
          this.subject = false;
          this.mail = false;
          break;

      case 'subject':
          this.level = false;
          this.class = false;
          this.arm = false;
          this.subject = true;
          this.mail = false;
          break;

      case 'mail':
          this.level = false;
          this.class = false;
          this.arm = false;
          this.subject = false;
          this.mail = true;
          break;

      default:
        this.level = true;
    }
  }

}
