import { Component, OnInit } from '@angular/core';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { ClassService } from 'src/services/data/class/class.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
table = true;
calendar = false;
daysInWeek: any;
periods: any;
subjectAndTime: any;
newList: any;
timeTable: any;
classes: any;


  constructor(
    private timeTableService: TimeTableService,
    private classService: ClassService,

  ) { }

  ngOnInit() {
    this.daysofWeek();
    this.getAllPeriods();
    this.getTimeTableForTeacher();
    this.getAllClassess();
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
    // this.daysInWeek = [
    // { id: 0, day: 'Monday', classes: [] },
    // { id: 1, day: 'Tuesday', classes: [] },
    // { id: 2, day: 'Wednesday', classes: [] },
    // { id: 3, day: 'Thursday', classes: [] },
    // { id: 4, day: 'Friday', classes: [] },
    // ];
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
    this.timeTableService.getPeriods().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.periods = data.payload;
        // ('peridos', this.periods);
      }
    });
  }


  getTimeTableForTeacher() {
    this.timeTableService.getTimeTableForTeacher().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        // (this.subjectAndTime);
        const tables = [];

        // (data);

      //   this.sortDays(data.payload);

      //   from(this.subjectAndTime)
      //    .pipe(
      //      groupBy(
      //        (result: any) =>
      //         result.periodName.split('_')[0]

      //      ),
      //      mergeMap(group => zip(of(group.key), group.pipe(toArray())))
      //    )
      //    .subscribe(xy => {
      //      // ('Periods', ...xy);
      //      tables.push(xy);
      //     });
      //   tables.sort((a, b) => a - b);
      //   this.timeTable = tables;
      //   // ('new', this.timeTable);

      // }
    }
  });
}

  sortDays(data: any) {
    data.forEach(element => {
      switch (element.day) {
        case 0:
          this.daysInWeek[0].classes.push(element);
          break;
        case 1:
          this.daysInWeek[1].classes.push(element);
          break;
        case 2:
          this.daysInWeek[2].classes.push(element);
          break;
        case 3:
          this.daysInWeek[3].classes.push(element);
          break;
        case 4:
          this.daysInWeek[4].classes.push(element);
          break;
        default:
          break;
      }
    });

    // (this.daysInWeek);
    const tables = [];

  }

  save(i) {
    // (i);
    // (this.daysInWeek[i].classes);
    sessionStorage.setItem('current-class', JSON.stringify(this.daysInWeek[i].classes[0]));
  }
 

  getAllClassess() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classes = data.payload;
        // (this.classes);
      }
    });
  }

}
