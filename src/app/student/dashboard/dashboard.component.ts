import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
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
  sessionList: any;
  currentTerm: any;

  constructor(
    private timeTableService: TimeTableService,
    private assignmentService: AssignmentService,
    private assessmentService: AssessmentService

  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.studentDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.daysofWeek();

    this.getAssignmentByClass();
    this.getTimeTableByClass();
    this.getSession();

  }

  daysofWeek() {
    this.days = [
    { id: 0, day: 'Monday' },
    { id: 1, day: 'Tuesday' },
    { id: 2, day: 'Wednesday' },
    { id: 3, day: 'Thursday' },
    { id: 4, day: 'Friday' },
    ];
    // ('dasy', this.days);
  }

  showPop() {
    const popcard = document.querySelector('.pop-card-holder');
    popcard.classList.toggle('show-pop');
  }

  getTimeTableByClass() {
    // const classId = 22;
    const weekday = [
      { id: 0, day: 'Monday' },
      { id: 1, day: 'Tuesday' },
      { id: 2, day: 'Wednesday' },
      { id: 3, day: 'Thursday' },
      { id: 4, day: 'Friday' },
    ][new Date().getDay() - 1];
    const day = weekday.id;

    this.timeTableService.getAllClassesForClassByDay(day).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        // ('dsds', this.subjectAndTime);
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
        //    // ('Periods', ...xy);
        //    tables.push(xy);
        //   });
        // this.timeTable = tables;
        // // ('time table', this.timeTable);
      }
    }, error => {
      // (error);
    });
  }

  save(i) {
    // (i);
    // (this.subjectAndTime[i]);
    sessionStorage.setItem('current-class', JSON.stringify(this.subjectAndTime[i]));
  }

  getAssignmentByClass() {
    // const classId = 25;

    this.assignmentService.getAssignmentByClass().subscribe((data: any) => {
      // ('sasasasas', data);
      if (data.hasErrors === false) {
        this.assignments = data.payload;
        // ('assignment', this.assignments);
        const assignment = [];
        from(this.assignments)
          .pipe(
            groupBy(
              (result: any) => result.status.split('_')[0]
            ),
            mergeMap(group => zip(of(group.key), group.pipe(toArray())))
          )
          .subscribe(list => {
             // ('Assignments', ...list);
             assignment.push(list);
          });
        this.dueAssignment = assignment[0][1];
        // (this.activeAssignment);
        this.activeAssignment  = assignment[1][1];
        // (this.dueAssignment);
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
    // const classId = 22;

    this.timeTableService.getAllClassesForClassByDay(day).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        // (this.subjectAndTime);

      }
    }, error => {
      // (error);
    });
  }

  getSession() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.sessionList = data.payload;
        const term: any = this.sessionList.terms;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < term.length; i++) {
          // (term[i]);
          if (term[i].isCurrent) {
            this.currentTerm  = term[i].name;

        }
      }}
    });
  }

}
