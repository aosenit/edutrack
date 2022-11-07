import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { StudentService } from 'src/services/data/student/student.service';
import { Chart } from 'chart.js';
import { ReportingService } from 'src/services/data/reporting/reporting.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-school-manager-dashboard',
  templateUrl: './school-manager-dashboard.component.html',
  styleUrls: ['./school-manager-dashboard.component.css']
})
export class SchoolManagerDashboardComponent implements OnInit {
  adminDetails: any;
  registeredSchools: any;
  schoolCount: any;
  studentCount: any;
  greet: any;
  p = 1;
  itemsPerPage = 5;
  loginDate: string;
  chart: any = [];
  barChart: any = [];
  barDashboardDatas: string[];



  @ViewChild('barChart', { static: true }) barChartRef: ElementRef;
  studentsOnPlatform: any;
  totalUser: any;
  totalStaffs: any;
  totalStudents: any;
  groupId: any;
  schoolDetail: any;
  id: any;


  constructor(
    private schoolService: SchoolService,
    private studentservice: StudentService,
    private notifyService: NotificationsService,
    ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.loginDate =  this.adminDetails.last_login_time + ' ' + 'UTC';
    this.groupId = this.adminDetails.SchGroupId;

    console.log(this.adminDetails)

    this.greeting();
    this.getAllSchool();
    this.getGroupOfSchoolsData(this.groupId, this.id)
  }

  
  getAllSchool() {
    this.schoolService.getAllGroupsInASchool(this.p, this.itemsPerPage, this.adminDetails.SchGroupId).subscribe((data: any) => {
      if (data) {
        this.registeredSchools = data.payload;
        // this.clientList.reverse();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  switchSwitch(id) {
    this.createBarChart();
    this.schoolService.getSchoolGroupAnalytics(id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.schoolCount = data.payload.studentsCount;
        // this.clientList.reverse();

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }
  switchSwitchSchoolGroup(id) {
    this.schoolService.getGroupOfSchoolsSchoolData(this.groupId,id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.totalStudents = data.payload.totalStudents;
        this.totalStaffs = data.payload.totalStaffs;
        this.totalUser  = data.payload.totalUsers;
        // this.clientList.reverse();

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getSelectedSchoolInfo() {
    this.schoolService.getAllGroupsInASchool(this.p, this.itemsPerPage, this.adminDetails.SchGroupId).subscribe((data: any) => {
      if (data) {
        this.registeredSchools = data.payload;
        // this.schoolCount = data.totalCount;
        this.schoolCount = data.payload.length;
        // this.clientList.reverse();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getAllStudents() {
    this.studentservice.getAllStudents(this.p, this.itemsPerPage).subscribe(
      (res: any) => {
        this.studentCount = res.totalCount;
        
      }
    );
  }
 

  getGroupOfSchoolsData(groupId,id){
    this.schoolService.getGroupOfSchoolsSchoolData(this.groupId, this.id).subscribe((res:any) =>
    {
      console.log(res)
        this.totalStudents = res.payload.totalStudents;
        this.totalUser = res.payload.totalUsers;
        this.totalStaffs = res.payload.totalStaffs; 
    })
  }
  

  createBarChart() {

    const classTopics = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    this.chart = new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: classTopics,
        datasets: [
          {
            label: 'Fee',
            data: [12, 34, 56, 78, 80, 12, 2, 5, 6, 7, 6.9, 56],
            // borderColor: ['#EA2604'],
            backgroundColor: ['#17C7BF'],
            // backgroundColor: ['#e76f51', '#ffb638'],
            // hoverBorderColor: '#4288DC',
            // hoverBorderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        // cutoutPercentage: 70,
        legend: {
          display: true,
          labelString: 'Class Attendance',
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'Fee Chart',
                fontColor: 'black',
                fontFamily : 'Nunito',
                fontSize : 16


              },

              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'No of students',
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



  // getSchoolGroupByItsId
}
