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
  userId: any;
  wardDetail: any;
  assignmentCount: any;
  subjectRecord: any;
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
      this.userId = this.parentDetails.sub
   this.getAllTerm();
   this. getChildInSelectedSchool()
   this.getAllSubjects()
   
    
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
 this.getSubjectAttendance();
 
}


  
getAllTerm() {
  this.parentService.getSchoolSessions().subscribe((data: any) => {
    
    if (data.hasErrors === false) {
      
      // this.classList = data.payload;
     this.termList = data.payload[0].terms;
    }
  })
}

selectTerm(event: any) {
  const { startDate, endDate } = this.termList[event]
  this.selectedStartDate = startDate;
  this.selectedEndDate = endDate;
  
  this.selectedSubReport === 'classAttendance' ?   this.getClassAttendanceForStudent()
  :this.getSubjectAttendance();
  

}

getAllSubjects() {
  this.parentService.getAllSubjects().subscribe((data: any) => {
    if (data.hasErrors === false) {
      this.subjectList = data.payload;
   
    }
  })
}
  

selectSubject(event: any) {
  this.subjectId = event
  this.getSubjectAttendance();
 
}

getClassAttendanceForStudent() {
  this.parentService.getClassAttendance(this.wardId, this.wardClassId, this.selectedStartDate, this.selectedEndDate).subscribe((data: any) => {
    if (data.hasErrors === false) {
      this.classAttendanceList = data.payload[0].attendanceClassVms;

    }
    
  });
}


getSubjectAttendance() {
  this.parentService.getStudentAttendanceForSubject(this.wardId,"",this.subjectId, this.selectedStartDate)
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectRecord = data.payload;
      }
    });
}


// getSubjectAttendance() {
//     this.parentService.getSubjectAttendance(this.wardId).subscribe((data: any) => {
  
//       if (data.hasErrors === false) {
//         // (data.payload);
//         this.attendanceList = data.payload;
      
//     } 
//     });
//   }

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
        this.showClass = false, this.showTerm = true, this.showSubject = true, this.showNext = true, this.getAllTerm(),this.getAllSubjects,
        this.getSubjectAttendance()
      ) :
        '';
  }

 

  getStartDate(event) {
    this.selectedStartDate = event;
    this.selectedSubReport === 'classAttendance' ? this.getClassAttendanceForStudent() :

    this.selectedSubReport === 'subjectAttendance' ? this.getSubjectAttendance(): ""  
  }
 
  getEndDate(event) {
    this.selectedEndDate = event;
    this.selectedSubReport === 'classAttendance' ? this.getClassAttendanceForStudent() :

    this.selectedSubReport === 'subjectAttendance' ? this.getSubjectAttendance(): ""  
  }

// excelsheet
  downloadStudentAttendanceReport() {
    this.selectedSubReport === 'classAttendance' ? this.downloadStudentAttendanceByClassReport() :

    this.selectedSubReport === 'subjectAttendance' ? this.downloadStudentAttendanceBySubjectReport(): ""  
}

downloadStudentAttendanceByClassReport() {
  this.parentService.exportSingleStudentAttendanceByClassExcel(this.wardId, "", this.wardClassId,this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
    if (res.hasErrors === false) {
      const link = document.createElement('a');
      link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
      link.href = 'data:image/png;base64,' + res.payload.base64String;
      link.click();
    }
  });
}
downloadStudentAttendanceBySubjectReport() {
  this.parentService.exportSingleStudentAttendanceBySubjectExcel(this.wardId,"",this.subjectId, this.selectedStartDate).subscribe((res: any) => {
    if (res.hasErrors === false) {
      const link = document.createElement('a');
      link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
      link.href = 'data:image/png;base64,' + res.payload.base64String;
      link.click();
    }
  });
} 

// pdf file

 downloadStudentAttendanceReportInPdf() {
    this.selectedSubReport === 'classAttendance' ? this.downloadStudentAttendanceReportByClassInPdf() :

      this.selectedSubReport === 'subjectAttendance' ? this.downloadStudentAttendanceReportBySubjectInPdf() :""
  }

  downloadStudentAttendanceReportByClassInPdf() {
    this.parentService.exportSingleStudentAttendanceByClassPdf(this.wardId, "", this.wardClassId, this.selectedStartDate, this.selectedEndDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  downloadStudentAttendanceReportBySubjectInPdf() {
    this.parentService.exportSingleStudentAttendanceBySubjectPdf(this.wardId, "", this.subjectId, this.selectedStartDate).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
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


}
