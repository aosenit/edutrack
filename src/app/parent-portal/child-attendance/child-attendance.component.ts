import { Component, OnInit } from '@angular/core';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';

@Component({
  selector: 'app-child-attendance',
  templateUrl: './child-attendance.component.html',
  styleUrls: ['./child-attendance.component.css']
})
export class ChildAttendanceComponent implements OnInit {
  daysInWeek: any;
  periods: any;
  timeTableCells: any;
    timeTable: any;
  constructor(
    private timeTableService: TimeTableService

  ) { }

  ngOnInit() {
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
