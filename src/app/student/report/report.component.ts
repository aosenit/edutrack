import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AssessmentService } from "src/services/data/assessment/assessment.service";
import { ReportingService } from "src/services/data/reporting/reporting.service";
import { SubjectService } from "src/services/data/subject/subject.service";
import { ClassService } from "src/services/data/class/class.service";
import { TeacherService } from "src/services/data/teacher/teacher.service";
import { StudentService } from "src/services/data/student/student.service";

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
      ],
    },
    {
      id: 2,
      title: "Finance Report",
      slug: "financeReport",
      data: [
        { id: 1, title: "Payment" },
        { id: 1, title: "Subscriptions" },
      ],
    },
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
  showTerm: boolean;
  subjectList: any;
  studentAttendanceRecord: any;
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

  constructor(
    private reportingservice: ReportingService,
    private reportService: ReportingService,
    private subjectService: SubjectService,
    private assessmentService: AssessmentService,
    private classService: ClassService,
    private teacherService: TeacherService,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.getStudentByID();
  }

  getStudentByID() {
    const helper = new JwtHelperService();
    this.studentId = helper.decodeToken(localStorage.getItem("access_token"));
    this.id = this.studentId.sub;
    this.studentClassId = this.studentId.StudentClassId;
  }
  
  getReportType(event) {
    this.reportingOptions.forEach((item) => {
      if (item.slug === event) {
        this.selectedSlug = item.slug;
        this.selectedReportType = item.data;
        this.showTypes = true;
        this.getStudentAttendanceSummary()

      }
    });
  }
  selectReportType(event) {
    this.selectedSubReport = event;
    if (this.selectedSlug === "attendanceReport") {
      // this.getStudentByID();
      this.showNext = true;

      event === "classAttendance"
        ? ((this.subSlug = true),
          (this.showExportBtn = true),
          (this.showClass = false),
          (this.showTerm = true),
          (this.showSubject = false),
          // this.getAllClasses(),
          this.getStudentClassAttendance())
        : event === "subjectAttendance"
        ? ((this.subSlug = true),
          (this.showExportBtn = true),
          (this.showSubject = true),
          (this.showClass = false),
          this.getAllSubjects())
        : // this.getSubjectAttendance()
          (this.subSlug = false);
    } else if (this.selectedSlug === "financeReport") {
      this.showNext = true;
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

  selectSubject(event: any) {
    this.subjectId = event;
    this.getSubjectAttendance(this.id, this.id, event, this.selectedStartDate);
  }
  selectTerm(event: any) {
    const { startDate, endDate } = this.termList[event];
    this.selectedStartDate = startDate;
    this.selectedEndDate = endDate;
  }
  selectClass(event: any) {
    this.selectedClass = event;
    this.fetchStudentAttendanceRecord(this.id, this.classId);
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
      }
    });
  }
  getSubjectAttendance(studentId, studentUserId, subjectId, date) {
    this.reportService.getStudentAttendanceForSubject(studentId, studentUserId, subjectId, date)
      .subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.studentAttendanceRecord = data.payload;
        }
      });
  }
  
  fetchStudentAttendanceRecord(studentId, classId?) {
    this.reportService.getStudentAttendanceSummary(this.id, this.classId)
      .subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.studentAttendance = data.payload;
        }
      });
  }
  
  fetchSubjectAttendanceRecord(tenantId, subjectId?, startDate?, endDate?) {
    // tslint:disable-next-line:max-line-length
    this.reportService.getClassSubjectAttendanceWithDateSummary(
        tenantId,
        subjectId,
        startDate,
        endDate
      )
      .subscribe((res: any) => {
        if (res.hasErrors === false) {
          this.studentAttendanceRecord = res.payload;
        }
      });
  }

  getStudentClassAttendance() {
    this.reportService.getStudentAttendanceForClass(
        this.id,
        this.studentClassId,
        this.selectedStartDate,
        this.selectedEndDate
      )
      .subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classAttendance = data.payload;
        }
      });
  }

  getStudentAttendanceSummary() {
    this.reportService.getStudentAttendanceSummary(this.id, this.studentClassId).subscribe((res:any)=>{
      if (res.hasErrors === false) {
        this.studentAttendanceRecord = res.payload;
      }
    });
  }
}
