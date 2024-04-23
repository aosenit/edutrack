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
import { FinanceService } from 'src/services/data/finance/finance.service';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})

export class ReportingComponent implements OnInit {
  reportingOptions = [
    {
      id: 1, title: 'User profile', slug: 'userReport', data: [
        { id: 1, title: 'Student Profile', subSlug: 'studentProfile' },
        { id: 2, title: 'Teacher Profile', subSlug: 'teacherProfile' },
        { id: 3, title: 'Non Teaching Staff profile', subSlug: 'nonTeacherProfile' },
        { id: 4, title: 'Parent Profile', subSlug: 'parentProfile' },

      ]
    },
    {
      id: 2, title: 'Attendance Report', slug: 'attendanceReport', data: [
        { id: 1, title: 'Student Attendance', subSlug: 'studentAttendance' },
        { id: 2, title: 'Term Attendance', subSlug: 'termAttendance' },
        { id: 3, title: 'Session Attendance', subSlug: 'sessionAttendance' },
        { id: 4, title: 'Subject Attendance', subSlug: 'subjectAttendance' },
      ]
    },
    {
      id: 2, title: 'Invoice Report', slug: 'invoiceReport', data: [
        { id: 1, title: 'Pending', subSlug: 'pending'},
        { id: 2, title: 'Awaiting Approval', subSlug: 'awaitingApproval'},
        { id: 3, title: 'Rejected', subSlug: 'rejected'},
        { id: 4, title: 'Paid', subSlug: 'paid'}
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
  showTerm = false;
  showSession = false;
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
  totalTeacher: number;
  totalStudent: number;
  totalParent: number;
  totalNonTeacher: number;
  termList: any;
  sessionList: any;
  subjectId: any;
  subjectList: any;
  showSubject: boolean;
  childrenNamesInModal !:any[]
  parentNameInModal: any;
  invoiceList: any;
  p = 1;
  itemsPerPage = 10;
  status! : number 
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
    private financeService : FinanceService

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
      this.showTerm = false;
      event === 'teacherProfile' ? (this.subSlug = true, this.showClass = false, this.getAllTeachers()) :
        event === 'nonTeacherProfile' ? (this.subSlug = true, this.showClass = false, this.callNonTeacherEndPoint()) :
          event === 'studentProfile' ? (this.subSlug = true, this.showClass = true, this.getAllStudents()) :
            event === 'parentProfile' ? (this.subSlug = true, this.showClass = false, this.getAllParents())
              : this.subSlug = false;
      // you can call user focused endpoints here
    } else if (this.selectedSlug === 'attendanceReport') {
      this.fetchAttendanceRecord(this.adminDetails.TenantId);
      this.showNext = true;
      event === 'termAttendance' ? (
        this.subSlug = true, this.showExportBtn = true,
        this.showClass = true, this.showTerm = true, this.showSession = false, this.showNext = false, this.getAllTerm()) :
      event === 'sessionAttendance' ? (
        this.subSlug = true, this.showExportBtn = true,
        this.showClass = true, this.showTerm = false, this.showSession = true, this.showNext = false,
        this.getAllTerm()) :
        event === 'subjectAttendance' ? (
          this.subSlug = true, this.showExportBtn = true,
          this.showClass = false, this.showTerm = true, this.showSession = false, this.showNext = true, this.showSubject = true,
          this.getAllTerm(), this.getAllSubjects()) :
      this.fetchAttendanceRecord(this.adminDetails.TenantId);
    }  else if (this.selectedSlug === 'invoiceReport'){
      this.showNext = true;
      event === 'pending' ? (this.subSlug = true, this.status = 0, this.getAllTransactionByStatus( 0,this.p, this.itemsPerPage, this.selectedStartDate, this.selectedEndDate, "","")) :
      event === 'awaitingApproval' ? (this.subSlug = true, this.status = 1, this.getAllTransactionByStatus(1,this.p, this.itemsPerPage, this.selectedStartDate, this.selectedEndDate, "","")) :
      event === 'rejected' ? (this.subSlug = true, this.status = 2, this.getAllTransactionByStatus(2,this.p, this.itemsPerPage, this.selectedStartDate, this.selectedEndDate, "","")) :
      event === 'paid' ? (this.subSlug = true, this.status = 3, this.getAllTransactionByStatus(3,this.p, this.itemsPerPage, this.selectedStartDate, this.selectedEndDate, "","")) 
      : this.subSlug = false;
      (
      this.subSlug = true, 
      this.showExportBtn = true,
      this.showClass = false) 
    } 
  }

  getAllTerm() {
    this.assessmentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // this.classList = data.payload;
        this.sessionList = data.payload;
        this.termList = data.payload[0].terms;
      }
    });
  }

  selectTerm(event: any){
    
    const {startDate, endDate} = this.termList[event]
    this.selectedStartDate = startDate
    this.selectedEndDate = endDate
    this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, startDate, endDate);
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload
        

      }
    })
  }

  selectSubject(event: any) {
    this.subjectId = event
  this.fetchSubjectAttendanceRecord(this.adminDetails.TenantId,event, this.selectedStartDate, this.selectedEndDate);
  }

  fetchSubjectAttendanceRecord(tenantId,subjectId?, startDate?, endDate?) {
    // tslint:disable-next-line:max-line-length
    this.reportService.getClassSubjectAttendanceWithDateSummary(tenantId,subjectId,startDate, endDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.studentAttendanceRecord = res.payload;
        
      }
      
    });
  }
  

  getSessionDates(event: any) {
    const data = this.sessionList[event];
    this.selectedStartDate = data.terms[0].startDate;
    this.selectedEndDate = data.terms[2].endDate;
    this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate, this.selectedEndDate);

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
    if (this.selectedSlug === 'attendanceReport') {

      this.fetchAttendanceRecord(this.adminDetails.TenantId, event);
    } else if (this.selectedSlug === 'userReport' && this.selectedSubReport === 'studentProfile') {
      this.getStudentInAClass(event);
    }
  }
  getStudentInAClass(id) {
    this.studentService.getStudentInAClass(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentList = data.payload;
        this.totalStudent = data.totalCount;
      }
    });
  }
  getStartDate(event) {
    this.selectedStartDate = event;
    this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate);
    this.getAllTransactionByStatus(this.status,this.p, this.itemsPerPage, this.selectedStartDate, this.selectedEndDate,"","");
  }
  getEndDate(event) {
    this.selectedEndDate = event;
    this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate, this.selectedEndDate);
    this.getAllTransactionByStatus(this.status,this.p, this.itemsPerPage, this.selectedStartDate, this.selectedEndDate,"","");
  }


  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teachersList = data.payload;
        this.totalTeacher = data.totalCount;
      }
    });
  }

  callNonTeacherEndPoint() {
    this.staffService.getAllStaffInSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.employeeList = data.payload;
        this.totalNonTeacher = this.employeeList.length;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }
  getAllStudents() {
    this.studentService.getAllStudents(1, 1000).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentList = data.payload;
        this.totalStudent = data.totalCount;
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
        this.totalParent = data.totalCount;
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
      });
  }
 

// user profile export
  downloadReport() {
    this.selectedSubReport === 'nonTeacherProfile' ? this.downloadStaffRecord() :
      this.selectedSubReport === 'teacherProfile' ? this.downloadTeacherRecord() :
        this.selectedSubReport === 'studentProfile' ? this.downloadStudentRecord() :
          this.selectedSubReport === 'parentProfile' ? this.downloadParentRecord() :
          this.selectedSubReport === 'pending' ? this.downloadInvoiceInExcel(0) :
          this.selectedSubReport === 'awaitingApproval' ? this.downloadInvoiceInExcel(1) :
          this.selectedSubReport === 'rejected' ? this.downloadInvoiceInExcel(2) :
          this.selectedSubReport === 'paid' ? this.downloadInvoiceInExcel(3) :

            this.downloadAttendanceReport();
  }

  downloadReportInPdf() {
    this.selectedSubReport === 'nonTeacherProfile' ? this.downloadStaffRecordInPdf() :
      this.selectedSubReport === 'teacherProfile' ? this.downloadTeacherRecordInPdf() :
        this.selectedSubReport === 'studentProfile' ? this.downloadStudentRecordInPdf() :
        this.selectedSubReport === 'parentProfile' ? this.downloadParentRecordInPdf() :
        this.selectedSubReport === 'pending' ? this.downloadInvoiceInPDF(0) :
        this.selectedSubReport === 'awaitingApproval' ? this.downloadInvoiceInPDF(1) :
        this.selectedSubReport === 'rejected' ? this.downloadInvoiceInPDF(2) :
        this.selectedSubReport === 'paid' ? this.downloadInvoiceInPDF(3) :

          this.downloadAttendanceReportInPdf();
  }

// attendance export
  downloadattendanceReport() {
    this.selectedSubReport === 'studentAttendance' ? this. downloadAttendanceReport() :
      this.selectedSubReport === 'termAttendance' ? this. downloadAttendanceReport() :
        this.selectedSubReport === 'sessionAttendance' ? this. downloadAttendanceReport() :
         

            this.downloadSubjectAttendance();
  }


  downloadattendanceReportPdf() {
    this.selectedSubReport === 'studentAttendance' ? this.downloadAttendanceReportInPdf() :
      this.selectedSubReport === 'termAttendance' ? this.downloadAttendanceReportInPdf()  :
        this.selectedSubReport === 'sessionAttendance' ? this.downloadAttendanceReportInPdf()  :
         

            this.downloadSubjectInPdf();
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
  downloadAttendanceReportInPdf() {
    // tslint:disable-next-line:max-line-length
    this.reportService.exportAttendancePdf(this.adminDetails.TenantId,this.selectedClass, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
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
  downloadTeacherRecordInPdf() {
    this.teacherService.exportEmployeePdfFile(1).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `Teacher Data Report as at ${new Date().toLocaleString()}.pdf`;
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

  downloadStaffRecordInPdf() {
    this.teacherService.exportEmployeePdfFile(2).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `Non-Teaching Staff Data Report as at ${new Date().toLocaleString()}.pdf`;
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

  downloadStudentRecordInPdf() {
    this.studentService.exportStudentPdf(this.selectedClass).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }


  downloadParentRecord() {
    this.reportService.exportParentExcelSheet(this.adminDetails.TenantId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `Parent Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }

  downloadParentRecordInPdf() {
    this.reportService.exportParentPdf(this.adminDetails.TenantId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `Parent Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }

  downloadSubjectAttendance(){
    this.reportService.exportSubjectAttendance(this.adminDetails.TenantId,this.subjectId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
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
    this.reportService.exportSubjectAttendancePdf(this.adminDetails.TenantId,this.subjectId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }


  displayChildrenNamesInsideModal(parentName: string, childrenList: any) {
    this.parentNameInModal = parentName;
    this.childrenNamesInModal = childrenList
  }

  getAllTransactionByStatus(status,p, itemsPerPage,fromDate, endDate, keyword?,filter?){
    this.financeService.getAllTransactionByStatus(this.p, this.itemsPerPage, status ,keyword ,filter, this.selectedStartDate, this.selectedEndDate ).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.invoiceList = data.payload;
        // this.totalParent = data.totalCount;
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
      });
  }
  // download invoice report
  downloadInvoiceInExcel(status){
    this.financeService.exportInvoiceInExcel(status,this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  
  downloadInvoiceInPDF(status){
    this.financeService.exportInvoiceInPDF(status,this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
}
