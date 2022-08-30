import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReportingService } from 'src/services/data/reporting/reporting.service';

import { StaffService } from 'src/services/data/staff/staff.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

import { TeacherService } from 'src/services/data/teacher/teacher.service';
import { StudentService } from 'src/services/data/student/student.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
  reportingOptions = [
  
    {
      id: 2, title: 'Attendance Report', slug: 'attendanceReport', data: [
        { id: 1, title: 'Student Attendance' },
        { id: 2, title: 'Weekly Student Attendance' },
        { id: 3, title: 'Term Student Attendance' },
        { id: 4, title: 'Session Student Attendance' },

      ]
    }
  ];


  studentReport = [
  ];
  financeReport: [
    { id: 1, title: 'Payment' },
    { id: 1, title: 'Subscriptions' }
  ];
  selectedReportType: any;
  showNext = false;
  showTypes = false;
  showSubReport = false;
  showClass = false;
  selectedSubReport: any;
  adminDetails: any;
  selectedStartDate = '';
  selectedEndDate = '';
  studentAttendanceRecord: any;
  classList: any;
  selectedClass: any;
  selectedSlug: string;
  teachersList: any;
  subSlug = false;
  employeeList: any;
  showExportBtn = false;
  studentList: any;
  parentList: any;
  constructor(
    private classService: ClassService,
    private reportService: ReportingService,
    private staffService: StaffService,
    private notifyService: NotificationsService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private parentService: ParentsService,

  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));

    this.getAllClasses();

  }

  getReportType(event) {
    this.reportingOptions.forEach(item => {
      if (item.slug === event) {
        this.selectedSlug = item.slug;
        this.selectedReportType = item.data;
        this.showTypes = true;
      }
    });
  }

  selectReportType(event) {
    this.selectedSubReport = event;
    if (this.selectedSlug === 'userReport') {
      this.showNext = false;
      this.showExportBtn = true;

      event === 'teacherProfile' ? (this.subSlug = true, this.getAllTeachers()) :
        event === 'nonTeacherProfile' ? (this.subSlug = true, this.callNonTeacherEndPoint()) :
          event === 'studentProfile' ? (this.subSlug = true, this.showClass = true, this.getAllStudents()) :
            event === 'parentProfile' ? (this.subSlug = true, this.getAllParents())
              : this.subSlug = false;
      // you can call user focused endpoints here
    } else if (this.selectedSlug === 'attendanceReport') {
      this.showNext = true;
      this.showClass = true
      this.fetchAttendanceRecord(this.adminDetails.TenantId);
    }
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((res: any) => {
      if (res.hasErrors === false) {
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


  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teachersList = data.payload;
      }
    });
  }

  callNonTeacherEndPoint() {
    this.staffService.getAllStaffInSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.employeeList = data.payload;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }
  getAllStudents() {
    this.studentService.getAllStudents(1, 100).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentList = data.payload;
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  getAllParents() {
    this.parentService.getAllParentsInASchool(this.adminDetails.TenantId, 1, 100).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.parentList = data.payload;
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
      });
  }


  downloadReport() {
    this.selectedSubReport === 'nonTeacherProfile' ? this.downloadStaffRecord() :
      this.selectedSubReport === 'teacherProfile' ? this.downloadTeacherRecord() :
        this.selectedSubReport === 'studentProfile' ? this.downloadStudentRecord() :
          this.downloadAttendanceReport();
  }

  downloadAttendanceReport() {
    // tslint:disable-next-line:max-line-length
    this.reportService.exportAttance(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });

  }
  downloadTeacherRecord() {
    this.teacherService.exportEmployeeExcelFile(1).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }


  downloadStaffRecord() {
    this.teacherService.exportEmployeeExcelFile(2).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }

  downloadStudentRecord() {
    this.studentService.exportStudentExcelFile(this.selectedClass).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
}
