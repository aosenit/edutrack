import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReportingService } from 'src/services/data/reporting/reporting.service';
import { StaffService } from 'src/services/data/staff/staff.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})

export class ReportingComponent implements OnInit {
  reportingOptions = [
    {id: 1, title: 'User profile', slug: 'userReport', data : [
      {id: 1, title: 'Export Student Profile', subSlug: 'studentProfile'},
      {id: 2, title: 'Teacher Profile', subSlug: 'teacherProfile'},
      {id: 3, title: 'Non Teaching Staff profile', subSlug: 'nonTeacherProfile'},
      {id: 4, title: 'Parent Profile', subSlug: 'parentProfile'},

    ]},
    {id: 2, title: 'Attendance Report', slug: 'attendanceReport', data: [
      {id: 1, title: 'Student Attendance'},
      {id: 2, title: 'Weekly Student Attendance'},
      {id: 3, title: 'Term Student Attendance'},
      {id: 4, title: 'Session Student Attendance'},

    ]},
    // {id: 3, title: 'Library Report', slug: 'libraryReport', data: [
    //   {id: 1, title: 'Borrowed Book List'},
    //   {id: 2, title: 'Borrowed Overdue List'},

    // ]},
    // {id: 4, title: 'Finance Report', slug: 'financeReport', data: [
    //   {id: 1, title: 'Journal Listing / Transactions'},
    //   {id: 1, title: 'Monthly Depreciating Report'},
    //   {id: 1, title: 'Annual Depreciating Report'},
    //   {id: 1, title: 'Trial Balance'},
    //   {id: 1, title: 'Profit & Loss Statement  '},
    //   {id: 1, title: 'Balance Sheet  '},
    //   {id: 1, title: 'Cash Book  '},
    //   {id: 1, title: 'Vendor Line item Report  '},
    //   {id: 1, title: 'Receivable Line item Report  '},
    //   {id: 1, title: 'Asset Report  '},
    //   {id: 1, title: 'Witholding Tax Report  '},
    //   {id: 1, title: 'Inventory Report  '},
    //   {id: 1, title: 'Parent Line item Report  '},
    //   {id: 1, title: 'Spend Report  '},
    //   {id: 1, title: 'Budget / Project Stewardship Report  '},
    //   {id: 1, title: 'Project Line item Report  '}
    // ]},
  ];


  studentReport = [
  ];
  financeReport: [
    {id: 1, title: 'Payment'},
    {id: 1, title: 'Subscriptions'}
  ];
  selectedReportType: any;
  showNext = false;
  showTypes = false;
  showSubReport = false;
  selectedSubReport: any;
  adminDetails: any;
  selectedStartDate = '';
  selectedEndDate = '';
  studentAttendanceRecord: any;
  classList: any;
  selectedClass: any;
  selectedSlug: string;
  subSlug = false;
  employeeList: any
  constructor(
    private classService: ClassService,
    private reportService: ReportingService,
    private staffService: StaffService,
    private notifyService: NotificationsService,
  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    console.log(this.adminDetails);
    this.getAllClasses();

  }

  getReportType(event) {
    console.log('event', event)
    this.reportingOptions.forEach(item => {
      if (item.slug === event) {
        this.selectedSlug = item.slug;
        // console.log('I picked this slug', this.selectedSlug)
        this.selectedReportType = item.data;
        this.showTypes = true;
      }
    });
  }

  selectReportType(event) {
    this.selectedSubReport = event;
    if (this.selectedSlug === 'userReport') {
      this.showNext = false;
      // tslint:disable-next-line:max-line-length
      event === 'teacherProfile' ? (this.subSlug = true, this.callTeahcerEndPoint()) : event === 'nonTeacherProfile' ? (this.subSlug = true, this.callNonTeacherEndPoint()) : this.subSlug = false
      // you can call user focused endpoints here
    } else if (this.selectedSlug === 'attendanceReport') {
      this.showNext = true;

      this.fetchAttendanceRecord(this.adminDetails.TenantId);
    }
  }

  getAllClasses() {
      this.classService.getAllClasses().subscribe((res: any) => {
        if (res.hasErrors === false) {
          console.log(res);
          this.classList = res.payload;
        }
      });
  }

  fetchAttendanceRecord(tenantId, classId?, startDate?, endDate?) {
    this.reportService.GetClassAttendanceWithDateSummary(tenantId, classId, startDate, endDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.studentAttendanceRecord = res.payload;
      }
    });
  }

  selectClass(event) {
    console.log(event);
    this.selectedClass = event;
    this.fetchAttendanceRecord(this.adminDetails.TenantId, event);
  }

 getStartDate(event) {
  this.selectedStartDate = event;
  this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate);
}
getEndDate(event) {
  this.selectedEndDate = event;
  this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate, this.selectedEndDate);
 }


//  this is where Judith

callTeahcerEndPoint() {
  console.log('I am been called by Judith')
  // import th teacher service and call the right method
}

callNonTeacherEndPoint() {
  this.staffService.getAllStaffInSchool().subscribe( (data: any) => {
    if (data.hasErrors === false) {
      this.employeeList = data.payload;
      // ('all employees', this.employeeList);
    }
  }, error => {
    this.notifyService.publishMessages(error.errors, 'danger', 1);

  });
}

  downloadReport() {
    // tslint:disable-next-line:max-line-length
    this.reportService.exportAttance(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res.payload);
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }



}
