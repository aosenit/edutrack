import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: any;
  greet: string;
  schoolTenantId: any;
  childrenList: any;
  subjectAndTime: any;
  selectedWard: any;
  days: { id: number; day: string; }[];
  today: number;
  wardDetail: any;
  noWardSelected = true;
  wardSelected = false;
  assignmentCount = 0;
  schoolList: any;

  constructor(
    private parentService: ParentsService,
    private route: ActivatedRoute,
    private timeTableService: TimeTableService,
    private assignmentService: AssignmentService,
    private notifyService: NotificationsService,


  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));

    this.greeting();
    this.daysofWeek();
    this.getChildInSelectedSchool();
  }

  greeting() {
    const myDate = new Date();
    const hrs = myDate.getHours();


    if (hrs < 12) {
      this.greet = 'Good Morning';
    } else if (hrs >= 12 && hrs <= 17) {
      this.greet = 'Good Afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      this.greet = 'Good Evening';
    }
  }

 

  daysofWeek() {
    this.days = [
    { id: 0, day: 'Mon' },
    { id: 1, day: 'Tue' },
    { id: 2, day: 'Wed' },
    { id: 3, day: 'Thur' },
    { id: 4, day: 'Fri' },
    ];
    console.log('dasy', this.days);

    const day = new Date();
    this.today = day.getDay();
  }

  getChildInSelectedSchool() {
    this.parentService.getChildInASchoolForParent().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        console.log(data.payload);
        this.childrenList = data.payload;
      }
    });
  }

  selectWard(id, u) {
    this.selectedWard = this.childrenList[u];
    this.noWardSelected = false;
    this.wardSelected = true;
    
    sessionStorage.setItem('ward', JSON.stringify(this.childrenList[u]));
    this.wardDetail = JSON.parse(sessionStorage.getItem('ward'));

    console.log(id);
      // const classId = 22;
    const weekday = [
        { id: 0, day: 'Monday' },
        { id: 1, day: 'Tuesday' },
        { id: 2, day: 'Wednesday' },
        { id: 3, day: 'Thursday' },
        { id: 4, day: 'Friday' },
      ][new Date().getDay() - 1];
    const day = weekday.id;

    this.parentService.getAllClassesForClassByDay(this.selectedWard.classID, day).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.subjectAndTime = data.payload;
          console.log('dsds', this.subjectAndTime);
        }
      }, error => {
        console.log(error);
      });

    this.getAllSubjects();
    this.assignmentCount = 0;
  }


  getNextClassesForAClass(id) {

    this.parentService.getAllClassesForClassByDay(this.selectedWard.classID, id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        console.log(this.subjectAndTime);

      }
    }, error => {
      console.log(error);
    });
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

    this.parentService.getAllClassesForClassByDay(this.selectedWard.classID, day).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        console.log('dsds', this.subjectAndTime);

      }
    }, error => {
      console.log(error);
    });
  }

  getAllSubjects() {
    // const classId = 25;
    this.parentService.getAllSubjectsInAClassWithAssignmentCountByClassID(this.wardDetail.classID).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        console.log(data);
        const subjectList = data.payload;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < subjectList.length; i++) {
          this.assignmentCount += subjectList[i].assignmentCount;
          console.log(this.assignmentCount);
        }
      }
    });
  }





}
