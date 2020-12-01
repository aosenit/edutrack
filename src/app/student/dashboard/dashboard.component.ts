import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  assignments: any;
  dueAssignment: any;
  activeAssignment: any;
  subjectAndTime: any;
  studentDetails: any;
  myDate = new Date();
days: any;

  constructor(
    private timeTableService: TimeTableService,
    private assignmentService: AssignmentService
  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.studentDetails = helper.decodeToken(localStorage.getItem('access_token'));

    this.getTimeTableByClass();
    this.getAssignmentByClass();
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

  showPop() {
    const popcard = document.querySelector('.pop-card-holder');
    popcard.classList.toggle('show-pop');
  }

  getTimeTableByClass() {
    const classId = 25;
    const weekday = [
      { id: 0, day: 'Monday' },
      { id: 1, day: 'Tuesday' },
      { id: 2, day: 'Wednesday' },
      { id: 3, day: 'Thursday' },
      { id: 4, day: 'Friday' },
    ][new Date().getDay() - 1];
    const day = weekday.id;

    this.timeTableService.getAllClassesForClassByDay(classId, day).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        console.log(this.subjectAndTime);
        // this.timeTableCells = data.payload;
        // const tables = [];

        // from(this.timeTableCells)
        //  .pipe(
        //    groupBy(
        //      (result: any) => result.periodName.split('_')[0]
        //    ),
        //    mergeMap(group => zip(of(group.key), group.pipe(toArray())))
        //  )
        //  .subscribe(xy => {
        //    console.log('Periods', ...xy);
        //    tables.push(xy);
        //   });
        // this.timeTable = tables;
        // console.log('time table', this.timeTable);
      }
    }, error => {
      console.log(error);
    });
  }

  getAssignmentByClass() {
    const classId = 25;

    this.assignmentService.getAssignmentByClass(classId).subscribe((data: any) => {
      // console.log('sasasasas', data);
      if (data.hasErrors === false) {
        this.assignments = data.payload;
        const assignment = [];
        from(this.assignments)
          .pipe(
            groupBy(
              (result: any) => result.status.split('_')[0]
            ),
            mergeMap(group => zip(of(group.key), group.pipe(toArray())))
          )
          .subscribe(list => {
            //  console.log('Assignments', ...list);
            assignment.push(list);
          });
        this.dueAssignment = assignment[0][1];
        this.activeAssignment = assignment[1][1];
      }
    });
  }

  timeConvert(input) {
    // tslint:disable-next-line:prefer-const
    let num = input;
    const hours = (num / 60);
    // tslint:disable-next-line:prefer-const
    let newHours = Math.floor(hours);
    // tslint:disable-next-line:prefer-const
    let minutes = (hours - newHours) * 60;
    // tslint:disable-next-line:prefer-const
    let newMinutes = Math.round(minutes);
    return newHours + ' hr(s) and ' + newMinutes + 'mins';
  }

  getNextClassesForAClass(event) {
    const day = event;
    const classId = 25;

    this.timeTableService.getAllClassesForClassByDay(classId, day).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        console.log(this.subjectAndTime);

      }
    }, error => {
      console.log(error);
    });
  }

}
