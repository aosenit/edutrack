import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FinanceService } from 'src/services/data/finance/finance.service';
import { StaffService } from 'src/services/data/staff/staff.service';
import { StudentService } from 'src/services/data/student/student.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';

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
  allPaymentList: any;
  allFee = 0;

  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private staffService: StaffService,
    private finance: FinanceService,



  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.loginDate =  this.adminDetails.last_login_time + ' ' + 'UTC';

    this.greeting();
    this.getAllStudents();
    this.getAllEmployees();
    this.getAllPayment();
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
        console.log(data.payload.length);
        this.staffCount = data.payload.length;
      }
    });

    this.teacherService.getAllTeachers().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.staffCount += data.totalCount;
        console.log(this.staffCount);
      }
    });
  }


  getAllPayment() {
    this.finance.getAllTransactions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPaymentList = data.payload;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.allPaymentList.length; i++) {
         console.log(this.allPaymentList[i].amount);
         this.allFee += this.allPaymentList[i].amount;

        }
      }
  });
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


