import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ReportingService } from "src/services/data/reporting/reporting.service";
import { StudentService } from "src/services/data/student/student.service";
import { SubjectService } from "src/services/data/subject/subject.service";


@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {
  reportingOptions = [
    {
      id: 1,
      title: "Attendance Report",
      slug: "attendanceReport",
      data: [
        { id: 1, title: "Class Attendance", subSlug: "classAttendance" },
        { id: 2, title: "Subject Attendance", subSlug: "subjectAttendance" },
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
  selectedStartDate = "";
  selectedEndDate = "";
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

  constructor(
    private reportService: ReportingService,
    private subjectService: SubjectService,
    private studentService: StudentService
    
  ) {}

  ngOnInit() {
    this.getStudentByID();
    this.fetchStudentbyId();
  }

  getStudentByID() {
    const helper = new JwtHelperService();
    this.studentId = helper.decodeToken(localStorage.getItem("access_token"));
    this.studentUserId = this.studentId.sub;
    this.studentClassId = this.studentId.StudentClassId;
  }
  fetchStudentbyId(){
    this.studentService.getStudentProfile(this.studentUserId).subscribe((res:any)=>{
      if (res.hasErrors === false) {
        this.id = res.payload.id
      }
    });
  }
  
  getReportType(event) {
    this.reportingOptions.forEach((item) => {
      if (item.slug === event) {
        this.selectedSlug = item.slug;
        this.selectedReportType = item.data;
        this.showTypes = true;
        this.getStudentAttendanceSummary();
      }
    });
    
  }
  selectReportType(event) {
    this.selectedSubReport = event;
    if (this.selectedSlug === "attendanceReport"){

      this.showNext = true;
    
      event === "classAttendance" ? ((this.subSlug = true),
          this.showExportBtn = true,
          (this.showSubject = false),
          this.getStudentClassAttendance())
        : event === "subjectAttendance"
        ? (
          this.showExportBtn = true,
          this.showSubject = true,
          this.getAllSubjects())
        : this.getSubjectAttendance();
    } else {
      this. showNext = false;
    }
  }

  getStartDate(event) {
    this.selectedStartDate = event;
    this.getStudentClassAttendance();
    this.getSubjectAttendance();
  }
  getEndDate(event) {
    this.selectedEndDate = event;
    this.getStudentClassAttendance();
  }

  selectSubject(event: any) {
    this.subjectId = event;
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
    this.reportService.getStudentAttendanceForSubject(this.id,this.studentUserId, this.subjectId, this.selectedStartDate)
      .subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.subjectRecord = data.payload;
        }
      });
  }
  
  
  getStudentClassAttendance() {
    this.reportService.getStudentAttendanceForClass(this.id,this.studentUserId,this.studentClassId,this.selectedStartDate,this.selectedEndDate)
      .subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classAttendance = data.payload.attendanceClassVms;
        }
      });
  }


  getStudentAttendanceSummary() {
    this.reportService.getStudentAttendanceSummary(this.id, this.studentClassId).subscribe((res:any)=>{
      if (res.hasErrors === false) {
        this.studentRecord = res.payload;
      }
    });
  }

  downloadStudentAttendanceReport(){
    this.selectedSubReport === 'classAttendance' ? this.downloadStudentAttendanceByClassReport() :

    this.downloadStudentAttendanceBySubjectReport();
  }

  downloadStudentAttendanceByClassReport(){
    this.reportService.exportSingleStudentAttendanceByClassExcel(this.id, this.studentUserId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  downloadStudentAttendanceBySubjectReport(){
    this.reportService.exportSingleStudentAttendanceBySubjectExcel(this.id, this.studentUserId, this.subjectId, this.selectedStartDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }

  downloadStudentAttendanceReportInPdf(){
    this.selectedSubReport === 'classAttendance' ? this.downloadStudentAttendanceByClassReport() :

    this.downloadStudentAttendanceBySubjectReport();
  }

  downloadStudentAttendanceReportByClassInPdf(){
    this.reportService.exportSingleStudentAttendanceByClassPdf(this.id, this.studentUserId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  downloadStudentAttendanceReportBySubjectInPdf(){
    this.reportService.exportSingleStudentAttendanceBySubjectPdf(this.id, this.studentUserId, this.subjectId, this.selectedStartDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  
  
}

