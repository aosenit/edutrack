import { Component, OnInit } from '@angular/core';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
table = true;
calendar = false;
days: any;
periods: any;
subjectAndTime: any;
newList: any;
timeTable: any;

  constructor(
    private timeTableService: TimeTableService
  ) { }

  ngOnInit() {
    this.daysofWeek();
    this.getAllPeriods();
    this.getTimeTableForTeacher();
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

  getAllPeriods() {
    this.timeTableService.getPeriods().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.periods = data.payload;
      }
    });
  }


  getTimeTableForTeacher() {
    this.timeTableService.getTimeTableForTeacher().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        console.log(this.subjectAndTime);
        const tables = [];

        from(this.subjectAndTime)
         .pipe(
           groupBy(
             (result: any) => result.periodName.split('_')[0]
           ),
           mergeMap(group => zip(of(group.key), group.pipe(toArray())))
         )
         .subscribe(xy => {
           console.log('levels', ...xy);
           tables.push(xy);
          });
        this.timeTable = tables;
        console.log('time table', this.timeTable);
      }
    });
  }

}
