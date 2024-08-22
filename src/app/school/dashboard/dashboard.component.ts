import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FinanceService } from 'src/services/data/finance/finance.service';
import { StaffService } from 'src/services/data/staff/staff.service';
import { StudentService } from 'src/services/data/student/student.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';
import { Chart } from 'chart.js';
import { ClassService } from 'src/services/data/class/class.service';
import { AttendanceService } from 'src/services/data/attendance/attendance.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { AlumniService } from 'src/services/data/alumni/alumni.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
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
  subscriptionStatus: any;
  allowFinanceModule = false;

  eventLists: any;



  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private staffService: StaffService,
    private finance: FinanceService,
    private classService: ClassService,
    private attendance: AttendanceService,
    private notifyService: NotificationsService,
    private school: SchoolService,
    private alumni: AlumniService,
    private pipe: DatePipe

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
    this.getSubscriptionStatus();
    this.getAllAlumiEvents();


    if (this.adminDetails.UserType === 'SchoolAdmin') {
      this.allowFinanceModule = true;
    }
    const finance = [
      'FINANCE_CREATE',
      'FINANCE_READ',
      'FINANCE_UPDATE',
      'FINANCE_DELETE'
  ];
    if (this.adminDetails.Permission !== null || this.adminDetails.Permission !== undefined) {
      // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < finance.length; index++) {
      const element = finance[index];

      if (this.adminDetails.Permission.includes(element) && this.adminDetails.UserType === 'NonTeachingStaff') {
        this.allowFinanceModule = true;
      }
    }
    }

    console.log(this.allowFinanceModule);
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
        // console.log(data.payload[0]);
        this.attendance.getClassAttendanceForTeacher(data.payload[0].id).subscribe((res: any) => {
          if (res.hasErrors === false) {
            this.attendanceList = res.payload.map((x: any) => {
              return {
                ...x.attendanceClassVms.map((el: any) => {
                  return {
                    date: this.pipe.transform(el.attendanceDate, 'EEE'),
                    student: x.studentId,
                    attendanceStatus: el.attendanceStatus === 1 ? 'Present' : 'Absent'
                  };
                })
              };
            }).flat(Infinity);
            const flattenedArray = this.attendanceList.flatMap((item: any) => {
              return Object.values(item).map((entry: any) => ({
                date: entry.date,
                student: entry.student,
                attendanceStatus: entry.attendanceStatus
              }));
            });
            const groupedByDate = flattenedArray.reduce((acc, curr) => {
              const date = curr.date;
              acc[date] = acc[date] || {
                students: [],
                count: 0,
                present: 0,
                absent: 0
              };
              acc[date].students.push(curr);
              acc[date].count++;
              if (curr.attendanceStatus === 'Present') {
                acc[date].present++;
              } else {
                acc[date].absent++;
              }
              return acc;
            }, {});


            this.createBarChart(groupedByDate);
            // }
          }
        });
      }
    });
  }

  getClassAttendance(e) {
    // // (e);
    this.attendance.getClassAttendanceForTeacher(e).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.attendanceList = res.payload.map((x: any) => {
          return {
            ...x.attendanceClassVms.map((el: any) => {
              return {
                date: this.pipe.transform(el.attendanceDate, 'EEE'),
                student: x.studentId,
                attendanceStatus: el.attendanceStatus === 1 ? 'Present' : 'Absent'
              };
            })
          };
        }).flat(Infinity);
        const flattenedArray = this.attendanceList.flatMap((item: any) => {
          return Object.values(item).map((entry: any) => ({
            date: entry.date,
            student: entry.student,
            attendanceStatus: entry.attendanceStatus
          }));
        });
        const groupedByDate = flattenedArray.reduce((acc, curr) => {
          const date = curr.date;
          acc[date] = acc[date] || {
            students: [],
            count: 0,
            present: 0,
            absent: 0
          };
          acc[date].students.push(curr);
          acc[date].count++;
          if (curr.attendanceStatus === 'Present') {
            acc[date].present++;
          } else {
            acc[date].absent++;
          }
          return acc;
        }, {});


        this.createBarChart(groupedByDate);
        // }
      }
    });
  }

  getAllAlumiEvents() {
    this.alumni.getAllEvents().subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log('events', res.payload);
        this.eventLists = res.payload;
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


  createBarChart(data: any) {
    const dates = Object.keys(data);
    const counts = dates.map(date => data[date].count);
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
        labels: dates,
        datasets: [
          {
            label: 'Attendance',
            data: counts,
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


  getSubscriptionStatus() {
    this.school.getSchoolSubscriptionStatusById(this.adminDetails.TenantId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.subscriptionStatus = res.payload;
        this.notify();
      }
    });
  }

  notify() {
    setTimeout(() => {
      document.getElementById('popupBtn').click();
    }, 2000);
  }

}


