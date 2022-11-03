import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { ReportingService } from 'src/services/data/reporting/reporting.service';
import { StudentService } from 'src/services/data/student/student.service';
import { SubjectService } from 'src/services/data/subject/subject.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportingOptions = [
    {
      id: 2, title: 'Child Attendance', slug: 'attendanceReport', data: [
        { id: 1, title: 'Class Attendance', subSlug: 'classAttendance' },
        { id: 2, title: 'Subject Attendance', subSlug: 'subjectAttendance' },

      ]
    },

    // {
    //   id: 3, title: 'Billing Report', slug: 'billing', data: [
    //     { id: 1, title: 'Paid', subSlug: 'childAttendance' },
    //   ]
    // }
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
  subSlug = false;
  showExportBtn = false;
  studentList: any;
  parentList: any;
  teacherId: any;
  showWards = false;
  wardId: any;
  wardClassId: any;

  termList: any;
  subjectList: any;
  subjectId: any;
  parentDetails: any;
  childrenList: any;
  classAttendanceList: any;
  attendanceList: any;
  constructor(
    private classService: ClassService,
    private reportService: ReportingService,
    private notifyService: NotificationsService,
    private studentService: StudentService,
    private parentService: ParentsService,
    private assessmentService: AssessmentService,
    private subjectService: SubjectService,

  ) { }

  ngOnInit() {

    const helper = new JwtHelperService();
    this.parentDetails = helper.decodeToken(localStorage.getItem('access_token'));
   this.getAllTerm();
    




  }


  getChildInSelectedSchool() {
    this.parentService.getChildInASchoolForParent().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.childrenList = data.payload;
      }
    });
  }

selectWard(event) {
  this.childrenList.filter((item)=>{
    if(item.id === +event) {
      
      this.wardId = item.id;
      this.wardClassId = item.classID;
    }
  })
  // this.getClassAttendanceForStudent()
 this.getSubjectAttendance()
 
}


  
getAllTerm() {
  this.parentService.getSchoolSessions().subscribe((data: any) => {
    
    if (data.hasErrors === false) {
      
      // this.classList = data.payload;
     this.termList = data.payload[0].terms
    //  console.log(data.payload)
    }
  })
}
  






  selectTerm(event: any) {
    const { startDate, endDate } = this.termList[event]
    this.selectedStartDate = startDate;
    this.selectedEndDate = endDate;
   
    // this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, startDate, endDate);
  }



  getSubjectAttendance() {
    this.parentService.getSubjectAttendance(this.wardId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        this.attendanceList = data.payload;



      }
    });
  }

  getReportType(event) {
    this.reportingOptions.forEach(item => {
      if (item.slug === event) {
        this.selectedSlug = item.slug;
        this.selectedReportType = item.data;
        this.showTypes = true;

      }
    });

  if (event === 'attendanceReport') {
      this.getChildInSelectedSchool();
      this.showWards = true;
    }
  }




  selectReportType(event) {
    this.selectedSubReport = event;
    if (this.selectedSubReport === 'attendanceReport') {
      this.showNext = true;

    }
    event === 'classAttendance' ? (
      this.subSlug = true, this.showExportBtn = true,
      this.showClass = false, this.showTerm = true, this.showSubject = false, this.showNext =true, this.getAllTerm(),
      this.getClassAttendanceForStudent()
     
      ):

    event === 'subjectAttendance' ? (
        this.subSlug = true, this.showExportBtn = true,
        this.showClass = false, this.showTerm = true, this.showSubject = false, this.showNext = true, this.getAllTerm(),
        this.getSubjectAttendance()
      ) :
        '';
  }


  // getAllClasses() {
  //   this.classService.getTeacherClassesByClassId(this.teacherId).subscribe((data: any) => {
  //     if (data.hasErrors === false) {
  //       this.classList.push(data.payload);
  //       // this.teacherClassId = data.payload.classId;
  //     }
  //   }
  //   );
  // }

  // selectClass(event) {
  //   this.selectedClass = event;
  //   this.fetchAttendanceRecord(this.adminDetails.TenantId, event);
  // }


  // fetchAttendanceRecord(tenantId, classId?, startDate?, endDate?) {
  //   // tslint:disable-next-line:max-line-length
  //   this.reportService.GetClassAttendanceWithDateSummary(tenantId, classId, startDate, endDate).subscribe((res: any) => {
  //     if (res.hasErrors === false) {
  //       this.studentAttendanceRecord = res.payload;

  //     }
  //   });
  // }

  // fetchSubjectAttendanceRecord(tenantId, subjectId?, startDate?, endDate?) {
  //   // tslint:disable-next-line:max-line-length
  //   this.reportService.getClassSubjectAttendanceWithDateSummary(tenantId, subjectId, startDate, endDate).subscribe((res: any) => {
  //     if (res.hasErrors === false) {
  //       this.studentAttendanceRecord = res.payload;

  //     }

  //   });
  // }


  getStartDate(event) {
    this.selectedStartDate = event;

    // this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate);
    this.getSubjectAttendance()
  }
 
  getEndDate(event) {
    this.selectedEndDate = event;
    // this.fetchAttendanceRecord(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate, this.selectedEndDate);
    this.getSubjectAttendance()
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


  getClassAttendanceForStudent() {
    this.parentService.getClassAttendance(this.wardId, this.wardClassId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classAttendanceList = data.payload[0].attendanceClassVms;

      }
      
    });
  }


  downloadReport() {
    this.reportService.exportAttance(this.adminDetails.TenantId, this.selectedClass, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
          ;
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
