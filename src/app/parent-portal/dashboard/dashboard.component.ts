import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {
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
  chart: any = [];


  @ViewChild('lineChart', { static: true }) lineChartRef: ElementRef;
  attendanceList: any;
  classAttendanceList: any;
  dashboardDatas: unknown[];
  dashboardDataKeys: string[];

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
    // ('dasy', this.days);

    const day = new Date();
    this.today = day.getDay();
  }

  getChildInSelectedSchool() {
    this.parentService.getChildInASchoolForParent().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        // // (data.payload);
        console.log('children list', data.payload);
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

    // // (id);
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
          // // ('dsds', this.subjectAndTime);
        }
      }, error => {
        // // (error);
      });

    this.getAllSubjects();
    this.getSubjectAttendance();

    this.assignmentCount = 0;
  }


  getNextClassesForAClass(id) {

    this.parentService.getAllClassesForClassByDay(this.selectedWard.classID, id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        // (this.subjectAndTime);

      }
    }, error => {
      // // (error);
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
        // // ('dsds', this.subjectAndTime);

      }
    }, error => {
      // // (error);
    });
  }

  getAllSubjects() {
    // const classId = 25;
    this.parentService.getAllSubjectsInAClassWithAssignmentCountByClassID(this.wardDetail.classID).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        // (data);
        const subjectList = data.payload;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < subjectList.length; i++) {
          this.assignmentCount += subjectList[i].assignmentCount;
          // (this.assignmentCount);
        }
      }
    });
  }

  getSubjectAttendance() {
    this.parentService.getSubjectAttendance(this.wardDetail.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        this.attendanceList = data.payload;
        const newData = {};
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.attendanceList.length; i++) {
          const {subjectName, noOfTimesAttended } = this.attendanceList[i];
          // (subjectName, noOfTimesAttended);
          newData[subjectName] = noOfTimesAttended;
          // ('new Data', newData);
          this.dashboardDatas = Object.values(newData);
          this.dashboardDataKeys = Object.keys(newData);
          this.createLineChart(this.dashboardDatas);
        }
        // // (this.attendanceList);
        // // (this.dashboardDatas);


      }
    });
  }

  getClassAttendanceForStudent() {
    this.parentService.getClassAttendance(this.wardDetail.id, this.wardDetail.classID).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classAttendanceList = data.payload;
      }
    });
  }

  createLineChart(dashboardData: any) {
    const keys = [];
    const chartKey = this.dashboardDataKeys.forEach( element => {
      keys.push(element);
    });
    const classTopics = [
      ...keys
    ];
    this.chart = new Chart(this.lineChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: classTopics,
        datasets: [
          {
            label: 'Subjects',
            data: dashboardData,
            // borderColor: ['#EA2604'],
            backgroundColor: ['#4288DC'],
            // backgroundColor: ['#e76f51', '#ffb638', '#04b4ac', '#25554f'],
            // hoverBorderColor: '#4288DC',
            // hoverBorderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        cutoutPercentage: 70,
        legend: {
          display: true,
          labelString: 'Subject Attended',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Subjects',
                fontColor: 'black',
                fontFamily : 'Nunito',
                fontSize : 16


              },

              gridLines: {
                display: true
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                // labelString: 'No of active users',
                fontColor: 'black',
                fontFamily : 'Nunito',
                fontSize : 16

              },
              gridLines: {
                display: false
              },
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    }
    );
  }





}
