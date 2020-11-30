import { Component, OnInit } from '@angular/core';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.css']
})
export class ClassScheduleComponent implements OnInit {
  timeTableCells: any;
  timeTable: any;
  days: any;


  constructor(
    private timeTableService: TimeTableService
  ) { }

  ngOnInit() {
    this.getTimeTableByClass();
    this.daysofWeek();
  }

  daysofWeek() {
    this.days = [
    { id: 0, day: 'Monday' },
    { id: 1, day: 'Tuesday' },
    { id: 2, day: 'Wednesday' },
    { id: 3, day: 'Thursday' },
    { id: 4, day: 'Friday' },
    ];
    console.log(this.days);
  }

  getTimeTableByClass() {
    const classId = 25;
    this.timeTableService.getTimeTableForClass(classId).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        console.log(data);
        this.timeTableCells = data.payload;
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
