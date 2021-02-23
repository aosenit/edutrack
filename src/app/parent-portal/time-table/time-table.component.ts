import { Component, OnInit } from '@angular/core';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
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

  constructor(
    private timeTableService: TimeTableService

  ) { }

  ngOnInit() {
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
    console.log(this.daysInWeek);
  }

  getAllPeriods() {
    this.timeTableService.getPeriods().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.periods = data.payload;
      }
    });
  }


  getTimeTableByClass() {
    // const classId = 22;
    this.timeTableService.getTimeTableForClass().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        this.timeTableCells = data.payload;
        console.log(this.timeTableCells);
        const tables = [];

        from(this.timeTableCells)
         .pipe(
           groupBy(
             (result: any) => result.periodName.split('_')[0]
           ),
           mergeMap(group => zip(of(group.key), group.pipe(toArray())))
         )
         .subscribe(xy => {
           console.log('Periods', ...xy);
           tables.push(xy);
          });
        this.timeTable = tables;
        console.log('time table', this.timeTable);
      }
    });
  }

}
