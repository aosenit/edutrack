import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ReportingService } from 'src/services/data/reporting/reporting.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { StudentService } from 'src/services/data/student/student.service';
import { SubjectService } from 'src/services/data/subject/subject.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
  reportingOptions = [
    {
      id: 1,
      title: 'Attendance Report',
      slug: 'attendanceReport',
      data: [
        { id: 1, title: 'Class Attendance', subSlug: 'classAttendance' },
        { id: 2, title: 'Subject Attendance', subSlug: 'subjectAttendance' },
        { id: 3, title: 'Attendance Summary', subSlug: 'attendanceSummary' }
      ]
    }
  ];
  selectedSlug: string;
  selectedReportType: any;
  showTypes: boolean;
  selectedSubReport: any;
  showNext: boolean;
  invoiceList: any;
  unpaidInvoiceList: any;
  showExportBtn: boolean;
  subSlug: boolean;
  selectedStartDate = '';
  selectedEndDate = '';
  adminDetails: any;
  selectedClass: any;
  termList: any;
  showClass: boolean;
  subjectList: any;
  studentAttendanceRecord: any;
  studentRecord: any;
  classList: any;
  teacherId: any;
  classId: any;
  showSubject: boolean;
  classAttendance: any;
  studentId: any;
  id: any;
  studentDetails: any;
  studentAttendance: any;
  studentList: any;
  selectedClassId: any;
  subjectId: any;
  studentClassId: any;
  userId: any;
  studentUserId: any;
  studentSubjectRecord: any;
  subjectRecord: any;
  sessions: any;
  showTerm: boolean;
  tenantId: any;
  selectedDate: any;
  showDate: boolean;

  constructor(
    private reportService: ReportingService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private schoolSectionService: SchoolSectionService,
    private assessmentService: AssessmentService

  ) { }

  ngOnInit() {
    this.getStudentByID();
    this.fetchStudentbyId();
  }

  getStudentByID() {
    const helper = new JwtHelperService();
    this.studentId = helper.decodeToken(localStorage.getItem('access_token'));
    this.studentUserId = this.studentId.sub;
    this.studentClassId = this.studentId.StudentClassId;
    this.tenantId = this.studentId.tenantId;
  }
  fetchStudentbyId() {
    this.studentService.getStudentProfile(this.studentUserId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.id = res.payload.id;
      }
    });
  }

  getReportType(event) {
    this.reportingOptions.forEach((item) => {
      if (item.slug === event) {
        this.selectedSlug = item.slug;
        this.selectedReportType = item.data;
        this.showTypes = true;
      }
    });

  }
  selectReportType(event) {
    this.selectedSubReport = event;
    if (this.selectedSlug === 'attendanceReport') {
      this.showNext = true;

      event === 'classAttendance' ? ((this.subSlug = true),
        this.showExportBtn = true,
        (this.showSubject = false),
        this.getStudentClassAttendance(),
        this.showNext = true,
        this.showTerm = true,
        this.getAllTerm()

      )
        : event === 'subjectAttendance'
          ? (
            this.showExportBtn = true,
            this.showSubject = true,
            this.getAllSubjects(),
            this.showTerm = true,
            this.getSubjectAttendance(),
            this.showNext = false,
            this.showDate = true,
            this.getAllTerm()
          ) : event === 'attendanceSummary' ? (
              this.showExportBtn = false,
              this.showSubject = false,
              this.showNext = false,
              this.showTerm = true,
              this.getAllTerm(),
              this.getStudentAttendanceSummary()
            ) : (this.showNext = false);

    }
  }

  getStartDate(event) {
    this.selectedStartDate = event;
    this.getStudentClassAttendance();
  }
  getEndDate(event) {
    this.selectedEndDate = event;
    this.getStudentClassAttendance();
  }
  getDate(event){
    this.selectedDate = event;
    this.getSubjectAttendance();
  }
  selectSubject(event: any) {
    this.subjectId = event;
    this.getSubjectAttendance();
  }

  selectTerm(event: any) {

    const { startDate, endDate } = this.termList[event];
    this.selectedStartDate = startDate;
    this.selectedEndDate = endDate;
    this.selectedDate = startDate;
    this.getStudentClassAttendance();
    this.getSubjectAttendance();
  }




  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
      }
    });
  }
  getSubjectAttendance() {
    this.reportService.getStudentAttendanceForSubject(this.id, this.studentUserId, this.subjectId, this.selectedDate)
      .subscribe((data: any) => {
        if (!data.hasErrors) {
          this.subjectRecord = data.payload;
        }else {
          this.subjectRecord = undefined
        }
      });
  }


  getStudentClassAttendance() {
    this.reportService.getStudentAttendanceForClass(this.id, this.studentUserId, this.studentClassId, this.selectedStartDate, this.selectedEndDate)
      .subscribe((data: any) => {
        if (data.hasErrors === false && data.payload.length !== 0) {
          this.classAttendance = data.payload[0].attendanceClassVms;
        } else {
          this.classAttendance = undefined
        }
      });
  }


  getStudentAttendanceSummary() {
    this.reportService.getStudentAttendanceSummary(this.id, this.studentClassId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.studentRecord = res.payload;
      }
    });
  }

  getAllTerm() {
    this.assessmentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessions = data.payload;
        this.termList = data.payload[0].terms;
      }
    });
  }


  downloadStudentAttendanceReport() {
    this.selectedSubReport === 'classAttendance' ? this.downloadStudentAttendanceByClassReport() :

     this.downloadStudentAttendanceBySubjectReport();
  }

  downloadStudentAttendanceByClassReport() {
    this.reportService.exportSingleStudentAttendanceByClassExcel(this.id, this.studentUserId,this.classId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  downloadStudentAttendanceBySubjectReport() {
    this.reportService.exportSingleStudentAttendanceBySubjectExcel(this.id, this.studentUserId, this.subjectId, this.selectedDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  

  downloadStudentAttendanceReportInPdf() {
    this.selectedSubReport === 'classAttendance' ? this.downloadStudentAttendanceReportByClassInPdf() :

      this.downloadStudentAttendanceReportBySubjectInPdf();
  }

  downloadStudentAttendanceReportByClassInPdf() {
    this.reportService.exportSingleStudentAttendanceByClassPdf(this.id, this.studentUserId,this.classId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  downloadStudentAttendanceReportBySubjectInPdf() {
    this.reportService.exportSingleStudentAttendanceBySubjectPdf(this.id, this.studentUserId,this.subjectId, this.selectedDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  

}

