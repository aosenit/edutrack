import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FinanceService } from 'src/services/data/finance/finance.service';
import { StaffService } from 'src/services/data/staff/staff.service';
import { StudentService } from 'src/services/data/student/student.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';
import { Chart } from 'chart.js';
import { ClassService } from 'src/services/data/class/class.service';
import { AttendanceService } from 'src/services/data/attendance/attendance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  greet: string;
  adminDetails: any;
  loginDate: any;
  studentCount = 0;
  p = 1;
  itemsPerPage = 5;
  staffCount = 0;
  staffCount2 = 0;
  allPaymentList: any;
  allFee = 0;
  allFee2: any;
  chart: any = [];
  barChart: any = [];
  dashboardDatas = [];

  @ViewChild('lineChart', { static: true }) lineChartRef: ElementRef;
  @ViewChild('barChart', { static: true }) barChartRef: ElementRef;
  totalRevenue: any;
  classes: any;
  attendanceList: any;
  barDashboardDatas: string[];
  barDashboardDataKeys: string[];



  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private staffService: StaffService,
    private finance: FinanceService,
    private classService: ClassService,
    private attendance: AttendanceService



  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.loginDate =  this.adminDetails.last_login_time + ' ' + 'UTC';

    this.greeting();
    this.getAllStudents();
    this.getAllEmployees();
    this.getAllPayment();
    this.getAllClassesInSchool();
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


  getAllStudents() {
    this.studentService.getAllStudents(this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentCount = data.totalCount;
      }
    });
  }

  getAllEmployees() {
    this.staffService.getAllStaffInSchool().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.staffCount = data.payload;
        this.staffCount = data.payload.length;
      }
    });

    this.teacherService.getAllTeachers().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.staffCount2 = data.totalCount;
      }
    });
  }


  getAllPayment() {
    this.finance.getAllTransactions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPaymentList = data.payload;
        const revenue = [];
        const totalPaid = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.allPaymentList.length; i++) {
          this.allFee += this.allPaymentList[i].amount;
          revenue.push(this.allPaymentList[i].totalAmount);
          this.totalRevenue = revenue.reduce((a, b) => a + b, 0);
          totalPaid.push(this.allPaymentList[i].amount);
          this.allFee2 = totalPaid.reduce((a, b) => a + b, 0);

        }
        this.dashboardDatas.push(this.totalRevenue);
        this.dashboardDatas.push(this.allFee2);
        this.createLineChart(this.dashboardDatas);
        // this.createBarChart(this.dashboardDatas);
      }
  });
  }


  getAllClassesInSchool() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if ( data.hasErrors === false) {
        this.classes = data.payload;
<<<<<<< HEAD
        // (data.payload[0]);
=======
        // console.log(data.payload[0]);
>>>>>>> 8a6e4fd6618da5915d2b88889c7fad458574265c
        this.attendance.getClassAttendanceForTeacher(data.payload[0].id).subscribe((res: any) => {
          if (res.hasErrors === false) {
            this.attendanceList = data.payload;
            const newData = {};
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.attendanceList.length; i++) {
              const {attendanceDate, attendanceStatus } = this.attendanceList[i];
              // // (attendanceDate, attendanceStatus);
              newData[attendanceStatus] = attendanceStatus;
              // // ('new Data', newData);
              this.barDashboardDatas = Object.values(newData);
              this.barDashboardDataKeys = Object.keys(newData);
              this.createBarChart(this.barDashboardDatas);
            }
          }
        });
      }
    });
  }

  getClassAttendance(e) {
    // // (e);
    this.attendance.getClassAttendanceForTeacher(e).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.attendanceList = data.payload;
        const newData = {};
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.attendanceList.length; i++) {
          // // (this.attendanceList);
          const {attendanceDate, attendanceStatus } = this.attendanceList[i];
          // // (attendanceDate, attendanceStatus);
          newData[attendanceStatus] = attendanceStatus;
          // // ('new Data', newData);
          this.barDashboardDatas = Object.values(newData);
          this.barDashboardDataKeys = Object.keys(newData);
          this.createBarChart(this.barDashboardDatas);
        }
      }
    });
  }

  createLineChart(dashboardData: any) {

    const classTopics = [
      'Total Revenue',
      'Amount Paid'
    ];
    this.chart = new Chart(this.lineChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: classTopics,
        datasets: [
          {
            label: 'Revenue',
            data: dashboardData,
            // borderColor: ['#EA2604'],
            // backgroundColor: ['#4288DC'],
            backgroundColor: ['#e76f51', '#ffb638'],
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
              display: false,
              scaleLabel: {
                display: true,
                labelString: 'Revenue Chart',
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
              display: false,
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


  createBarChart(dashboardData: any) {

    const classTopics = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
    ];
    this.chart = new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: classTopics,
        datasets: [
          {
            label: 'Attendance',
            data: dashboardData,
            // borderColor: ['#EA2604'],
            backgroundColor: ['#4288DC'],
            // backgroundColor: ['#e76f51', '#ffb638'],
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
          labelString: 'Class Attendance',
        },
        scales: {
          xAxes: [
            {
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Attendance Chart',
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
              stacked: true,
              display: true,
              scaleLabel: {
                display: true,
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

  // tslint:disable-next-line:variable-name
  addCommas(number: any) {
    const num = Number(number);
    if (isNaN(num)) {
      return number;
    }

    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

}


