import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subjectAndTime: any;
  weekday: any;
  teacherDetails: any;
  myDate = new Date();
  studentAssignmentList: any;
  sessionList: any;
  currentTerm: any;

  constructor(
    private timeTableService: TimeTableService,
    private teacherService: TeacherService,
    private assessmentService: AssessmentService

  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.teacherDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.getClassesForTeacherByDay();
    this.getNextClassesForTeacherByDay();
    this.getSession();
  }

  showPop() {
    const popcard = document.querySelector('.pop-card-holder');
    popcard.classList.toggle('show-pop');
  }


  showPop2() {
    const popcard = document.querySelector('.pop-card-holder2');
    popcard.classList.toggle('show-pop');
  }

  save(i) {
    console.log(i);
    console.log(this.subjectAndTime[i]);
    sessionStorage.setItem('current-class', JSON.stringify(this.subjectAndTime[i]));
  }



  //   getTimeTableForTeacher() {
  //     this.timeTableService.getTimeTableForTeacher().subscribe((data: any) => {
  //       if (data.hasErrors === false) {
  //         this.subjectAndTime = data.payload;
  //         console.log(this.subjectAndTime);
  //      }
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  getClassesForTeacherByDay() {
    const weekday = [
      { id: 0, day: 'Monday' },
      { id: 1, day: 'Tuesday' },
      { id: 2, day: 'Wednesday' },
      { id: 3, day: 'Thursday' },
      { id: 4, day: 'Friday' },
    ][new Date().getDay() - 1];
    const day = weekday.id;


    this.timeTableService.getAllClassesForTeacherByDay( day).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        console.log(this.subjectAndTime);
      }
    }, error => {
      console.log(error);
    });
  }

  getNextClassesForTeacherByDay() {
    // const teacherId = 3;
    // const weekday = [
    //   { id: 0, day: 'Monday' },
    //   { id: 1, day: 'Tuesday' },
    //   { id: 2, day: 'Wednesday' },
    //   { id: 3, day: 'Thursday' },
    //   { id: 4, day: 'Friday' },
    // ][new Date().getDay() + 1];
    // const day = weekday.id;
    // console.log(day);


    // this.timeTableService.getNextClassessForTeacherByDay(teacherId, 4).subscribe((data: any) => {
    //   if (data.hasErrors === false) {
    //   //  console.log(data);
    //   }
    // }, error => {
    //   console.log(error);
    // });
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
    return newHours + ' hr(s) and ' + newMinutes + 'mins' ;
    }

    // getAssignmentSubmission() {
    //   this.teacherService.getAllAssignmentSubmissionForASubject(this.id).subscribe((data: any) => {
    //     console.log(data);
    //     if (data.hasErrors === false) {
    //       console.log('asasasa', data);
    //       this.studentAssignmentList = data.payload;
    //     }
    //   }, error => {
    //     console.log(error);
    //   });
    // }

    getSession() {
      this.assessmentService.getCurrentSession().subscribe((data: any) => {
        if (data.hasErrors === false) {
          console.log(data);
          this.sessionList = data.payload;
          const term: any = this.sessionList.terms;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < term.length; i++) {
            console.log(term[i]);
            if (term[i].isCurrent) {
              this.currentTerm  = term[i].name;
  
          }
        }}
      });
    }
  
}
