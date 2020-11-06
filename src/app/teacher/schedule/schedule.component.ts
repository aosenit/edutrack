import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
table = true;
calendar = false;

  constructor() { }

  ngOnInit() {
  }

  showSelect(select: string) {
    const newSelect = select;
    switch (newSelect) {
      case 'table':
        this.table = true;
        this.calendar = false;
        break;
      case 'calendar':
        this.table = false;
        this.calendar = true;
        break;
      default:
        this.table = true;
    }
  }

}
