import { Component, OnInit } from '@angular/core';
import { ParentsService } from 'src/services/data/parents/parents.service';


import { TimeTableService } from 'src/services/data/time-table/time-table.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
timetable = true;
calender = false;
daysInWeek: any;
periods: any;
timeTableCells: any;
  timeTable: any;
  wardDetail: any;

  constructor(
    private timeTableService: TimeTableService,
    private parentService: ParentsService

  ) { }

  ngOnInit() {
    this.wardDetail = JSON.parse(sessionStorage.getItem('ward'));
    this.getTimeTableByClass();
    this.daysofWeek();
    this.getAllPeriods();
  }
  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus) {

      case 'timeTable':
        this.timetable = true;
        this.calender = false;
        break;


      case 'calender':
        this.timetable = false;
        this.calender = true;
        break;

      default:
        this.timetable = true;
    }
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

  getAllPeriods() {
    this.parentService.getPeriods().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.periods = data.payload;
      }
    });
  }


  getTimeTableByClass() {
    // const classId = 22;
    this.parentService.getTimeTableForClass(this.wardDetail.classID).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        this.timeTableCells = data.payload;
        // (this.timeTableCells);

      }
    });
  }

}
