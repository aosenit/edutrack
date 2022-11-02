import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReportingService } from 'src/services/data/reporting/reporting.service';

import { StaffService } from 'src/services/data/staff/staff.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

import { TeacherService } from 'src/services/data/teacher/teacher.service';
import { StudentService } from 'src/services/data/student/student.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { SubjectService } from 'src/services/data/subject/subject.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {
  reportingOptions = [
    {
      id: 2, title: 'Attendance Report', slug: 'attendanceReport', data: [
        { id: 1, title: 'Class Attendance', subSlug: 'classAttendance' },
        { id: 2, title: 'Subject Attendance', subSlug: 'subjectAttendance' }

      ]
    }
  ];


  selectedReportType: any;
  showNext = false;
  showTypes = false;
  showSubReport = false;
  showClass = false;
  showTerm = false;
  showSubject = false;
  selectedSubReport: any;
  adminDetails: any;
  selectedStartDate = '';
  selectedEndDate = '';
  studentAttendanceRecord: any;
  classList = [];
  selectedClass: any;
  selectedSlug: string;
  teachersList: any;
  subSlug = false;
  employeeList: any;
  showExportBtn = false;
  studentList: any;
  parentList: any;
  teacherId: any;

  termList: any;
  subjectList: any;
  subjectId: any;

  constructor(
    private classService: ClassService,
    private reportService: ReportingService,
    private staffService: StaffService,
    private notifyService: NotificationsService,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private parentService: ParentsService,
    private assessmentService: AssessmentService,
    private subjectService: SubjectService,

  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));

    this.getTeacherDetailsByUserId();
    this.getAllSubjects();

  }


  downloadReportOption() {
    this.selectedSubReport === 'classAttendance' ? this.downloadReport() :
      this.selectedSubReport === 'subjectAttendance' ? this.downloadSubjectAttendance() : ""

  }


  downloadReportOptionPdf() {
    this.selectedSubReport === 'classAttendance' ? this.downloadReportInPdf() :
      this.selectedSubReport === 'subjectAttendance' ? this.downloadSubjectInPdf() : ""

  }

  getAllTerm() {
    this.assessmentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // this.classList = data.payload;
        this.termList = data.payload[0].terms

      }
    })
  }

  selectTerm(event: any) {
    const { startDate, endDate } = this.termList[event];
    this.selectedStartDate = startDate;
    this.selectedEndDate = endDate;
    this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, startDate, endDate);
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;


      }
    })
  }
  selectSubject(event: any) {
    this.subjectId = event
    this.fetchSubjectAttendanceRecord(this.adminDetails.TenantId, event, this.selectedStartDate, this.selectedEndDate);
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

  // selectReportType(event) {
  //   this.selectedSubReport = event;
  //   if ( this.selectedSubReport === "1") {
  //     this.showNext = true;
  //     this.showClass = true;
  //     this.showTerm = true;
  //     this.getAllTerm()


  //     this.fetchAttendanceRecord(this.adminDetails.TenantId);
  //   }else if(this.selectedSubReport === "2" ) {
  //           this.showNext = true;
  //           this.showClass =false;
  //           this.showSubject = true;
  //           this.showTerm = true;
  //           this.getAllTerm()
  //           this.getAllSubjects()

  //   }
  // }


  selectReportType(event) {
    this.selectedSubReport = event;
    if (this.selectedSubReport === 'attendanceReport') {
      this.fetchAttendanceRecord(this.adminDetails.TenantId);
      this.showNext = true;

    }
    event === 'classAttendance' ? (
      this.subSlug = true, this.showExportBtn = true,
      this.showClass = true, this.showTerm = true, this.showSubject = false, this.showNext = true, this.getAllTerm(),
      this.fetchAttendanceRecord(this.adminDetails.TenantId)) :
      event === 'subjectAttendance' ? (
        this.subSlug = true, this.showExportBtn = true,
        this.showClass = false, this.showTerm = true, this.showSubject = true, this.showNext = true,
        this.getAllTerm(), this.getAllSubjects()) :
        this.fetchAttendanceRecord(this.adminDetails.TenantId);
    // else {
    //   this.showNext = false;
    //   this.showExportBtn = false;
    //   this.showTerm = false;
    //   this.showSubject = false;
    // }
  }


  getAllClasses() {
    this.classService.getTeacherClassesByClassId(this.teacherId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classList.push(data.payload);
        // this.teacherClassId = data.payload.classId;
      }
    }
    );
  }

  selectClass(event) {
    this.selectedClass = event;
    this.fetchAttendanceRecord(this.adminDetails.TenantId, event);
  }


  fetchAttendanceRecord(tenantId, classId?, startDate?, endDate?) {
    // tslint:disable-next-line:max-line-length
    this.reportService.GetClassAttendanceWithDateSummary(tenantId, classId, startDate, endDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.studentAttendanceRecord = res.payload;

      }
    });
  }

  fetchSubjectAttendanceRecord(tenantId, subjectId?, startDate?, endDate?) {
    // tslint:disable-next-line:max-line-length
    this.reportService.getClassSubjectAttendanceWithDateSummary(tenantId, subjectId, startDate, endDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.studentAttendanceRecord = res.payload;

      }

    });
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


  getTeacherDetailsByUserId() {
    this.teacherService.getTeacherDetailsByUserId(this.adminDetails.sub).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teacherId = data.payload.teacherId;
        this.getAllClasses()
      }

    })
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
    // this.selectedSubReport === 'nonTeacherProfile' ? this.downloadStaffRecord() :
    //   this.selectedSubReport === 'teacherProfile' ? this.downloadTeacherRecord() :
    //     this.selectedSubReport === 'studentProfile' ? this.downloadStudentRecord() :
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


  downloadReportInPdf() {
    // tslint:disable-next-line:max-line-length
    this.reportService.exportAttendancePdf(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }

  downloadSubjectAttendance() {
    // tslint:disable-next-line:max-line-length
    this.reportService.exportSubjectAttendance(this.adminDetails.TenantId, this.subjectId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }

  downloadSubjectInPdf() {
    // tslint:disable-next-line:max-line-length
    this.reportService.exportSubjectAttendancePdf(this.adminDetails.TenantId, this.subjectId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }

}
