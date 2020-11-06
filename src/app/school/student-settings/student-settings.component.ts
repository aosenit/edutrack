import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-settings',
  templateUrl: './student-settings.component.html',
  styleUrls: ['./student-settings.component.css']
})
export class StudentSettingsComponent implements OnInit {

  action = true;
  offence = false;
  item = false;
  position = false;
  absent = false;
  constructor() { }

  ngOnInit() {
  }

  showStatus(status: string) {
    const newStatus = status;

    switch (newStatus ) {

      case 'action':
          this.action = true;
          this.offence = false;
          this.item = false;
          this.position = false;
          this.absent = false;
          break;


      case 'offence':
          this.action = false;
          this.offence = true;
          this.item = false;
          this.position = false;
          this.absent = false;
          break;

      case 'item':
          this.action = false;
          this.offence = false;
          this.item = true;
          this.position = false;
          this.absent = false;
          break;

      case 'position':
          this.action = false;
          this.offence = false;
          this.item = false;
          this.position = true;
          this.absent = false;
          break;

      case 'absent':
          this.action = false;
          this.offence = false;
          this.item = false;
          this.position = false;
          this.absent = true;
          break;

      default:
        this.action = true;
    }

  }
}
