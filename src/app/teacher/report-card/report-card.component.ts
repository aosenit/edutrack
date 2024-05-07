import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StaffService } from 'src/services/data/staff/staff.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css', './print-report.component.css'],
  styles: [
    `
    @media print {

      #app-results-print {
    display: block;
  }
}
    `
  ]
})
export class ReportCardComponent implements OnInit {
  noData = true;
  displayData = false;
  classList: any;
  studentList: any;
  gradeSetup: any;
  selectedStudent: any;
  studentRecord: any;
  assessments: any;
  selectedClassId: any;
  sessions: any;
  terms: any;
  termName: any;
  selectedClass: any;
  selectedTermId: any;
  studentBehaviour: any;
  reportSheetDetails: any;
  totalScoreObtained: any;
  performanceRate: any;
  selectedStudentID: any;
  sessionsId: any;
  classSubjectCount: number;
  subjectoffered: number;
  averageScore: number;
  totalSchoolScore: number;
  totalCA: number;
  totalExam: number;
  classPercentage: number;
  loggedInUser: any;
  schoolDetail: any;
  totalExamScoreObtained: any;
  totalCAScoreObtained: any;
  HeadTeacherDetails: any;
  classTeacherDetials: any;
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private schoolService: SchoolService,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,
    private staffService: StaffService
  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
    this.getClassAndSubjectForTeacher();
    this.getStudentList();
    this.getCurrentSesion();
    this.generateGradeSetup();
    this.getSchoolDetialsByID();

    // this.getApprovedStudentResults();
    // // ('route', this.route);


  }

  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.classList = data.payload;
        // // (this.classList);
      }
    }
    );
  }

  getStudentList() {
    // // (this.classList[event]);
    // this.selectedClassId = this.classList[event].classId;
    // this.selectedClass = this.classList[event].class;
    // tslint:disable-next-line:prefer-for-of

    this.classService.getStudentsInAClassByClassID(this.loggedInUser.TeacherClassId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.studentList = data.payload;
        // // (this.classList);
      }
    });

  }

  generateGradeSetup() {
    this.assessmentService.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // ('All school grade', data.payload);
        this.gradeSetup = data.payload;
      }
    });
  }

  getCurrentSesion() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessions = data.payload;
        this.sessionsId = data.payload.id;
        this.terms = data.payload.terms;
      }
    });
  }

  getAge(birthDate: any) {
    const currentYear = new Date();
    const diff = currentYear.getFullYear() - new Date(birthDate).getFullYear();
    // return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return diff;
  }

  selectedTerm(event) {
   this.termName = this.terms[event];
   this.selectedTermId = this.terms[event].sequenceNumber;
  }

  getStudentRecord(i) {
    this.selectedStudent = this.studentList[i];
    this.selectedStudentID = this.studentList[i].id;
    // tslint:disable-next-line:max-line-length
    this.resultService.getStudentBehviour(this.sessionsId, this.selectedTermId, this.loggedInUser.TeacherClassId, this.selectedStudentID  ).subscribe((data: any) => {
     if (data.hasErrors === false) {
      //  // (data.payload);
       this.noData = false;
       this.displayData = true;
       this.studentBehaviour = data.payload.resultTypeAndValues;
       this.getApprovedStudentResults();
      //  this.studentRecord = data.payload.breakdowns;
      //  this.assessments = data.payload.breakdowns[0].assesmentAndScores;
      //  // (this.assessments);
     }
   }, error => {
     this.notifyService.publishMessages(error.errors, 'danger', 1);

   });
 }


 getApprovedStudentResults() {
  // tslint:disable-next-line:max-line-length
  this.resultService.getApprovedStudentResult(this.selectedStudentID, this.loggedInUser.TeacherClassId, this.sessionsId, this.selectedTermId ).subscribe((data: any) => {
    if (data.hasErrors === false) {
      // // (data.payload);
      this.reportSheetDetails = data.payload;
      this.studentRecord = data.payload.breakdowns;
      this.subjectoffered = data.payload.subjectOffered;
      this.getAllSubjectsInAClasses();
      this.getStaffSignatureForReportCard();
      this.calculateTotalScoreObtained(this.studentRecord);
      this.getAllAssessments();

      this.assessments = data.payload.breakdowns[0].assesmentAndScores;

      // // (this.assessments);
    } else {

      this.notifyService.publishMessages(data.errors, 'danger', 1);
      this.noData = true;
      this.displayData = false;
    }
  }, error => {
    this.notifyService.publishMessages(error.errors[0], 'danger', 1);

  });
 }

 getAllSubjectsInAClasses() {
   this.classService.getAllSubjectsInAClassByClassID(this.loggedInUser.TeacherClassId).subscribe((data: any) => {
     if (data.hasErrors === false) {
       const classSubjectCount: any = data.payload;
      //  // (classSubjectCount.length);
       this.classSubjectCount = classSubjectCount.length;
     }
    });
 }




getStatus() {

}


getAllAssessments() {
  this.assessmentService.getAllAssessmentSetup().subscribe((data: any) => {
    if (data.hasErrors === false) {
      const result: any =  data.payload;
      const caArray = [];
      // // (this.subjectoffered);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < result.length; i++) {
        // // (result[i].maxScore);
        if (result[i].name.toLowerCase().includes('xam') || result[i].isExam === true) {
          this.totalExam = result[i].maxScore * this.subjectoffered;
        } else {
          caArray.push(result[i].maxScore * this.subjectoffered);
          this.totalCA = caArray.reduce((a, b) => a + b, 0);
          // // (caArray);
        }
        this.totalSchoolScore = this.totalCA + this.totalExam;

        this.getPercentage();
        this.getRate();
      }
    }
  });
}


calculateTotalScoreObtained(data) {
  const totalScore = [];
  const totalExamScore = [];
  this.totalSchoolScore = this.totalCA + this.totalExam;

  this.getTotalSchoolScoreForClass();
  // tslint:disable-next-line:prefer-for-of
  for ( let i = 0; i < data.length; i++) {
    totalScore.push(data[i].cummulativeScore);
    totalExamScore.push(data[i].cummulativeScore);
    this.totalScoreObtained = totalScore.reduce((a, b) => a + b, 0);
    this.averageScore = Math.round(((this.totalScoreObtained / this.subjectoffered) * 10) / 10);
  }
}

getPercentage() {
  this.classPercentage  = Math.round((this.totalScoreObtained / this.totalSchoolScore ) * 100) ;
 //  // (this.classPercentage);
}

getRate() {
  this.performanceRate = ((this.classPercentage / 100) * 5).toFixed(2);
}

getTotalSchoolScoreForClass() {

  this.totalSchoolScore = this.totalCA + this.totalExam;

  this.getTotalExamScore( );
}

getTotalExamScore() {
  const data: any = this.studentRecord;
  const examArray = [];
  const caArray = [];


  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < data.length; i++) {
    const iDonTire: any = data[i].assesmentAndScores;
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < iDonTire.length; j++) {
    //  // (iDonTire[j]);
     if (iDonTire[j].assessmentName.toLowerCase().includes('xam') || iDonTire[j].isExam === true) {
      // // ('yes');
      examArray.push(iDonTire[j].studentScore);
      this.totalExamScoreObtained = examArray.reduce((a, b) => a + b, 0);
      // // (examArray);
    } else {
      caArray.push(iDonTire[j].studentScore);
      this.totalCAScoreObtained = caArray.reduce((a, b) => a + b, 0);
      // // (caArray);

    }
    }
  }
}




getSchoolDetialsByID() {
  this.schoolService.getSchoolById(this.loggedInUser.TenantId).subscribe( (data: any) => {
    if (data.hasErrors === false) {
      this.schoolDetail = data.payload;
    }
  });

}

getStaffSignatureForReportCard() {
  this.staffService.getStaffSignature(this.reportSheetDetails.headTeacherId).subscribe((data: any) => {
    if (data.hasErrors === false) {
      // (data.payload);
      this.HeadTeacherDetails = data.payload;
    }
  });
  this.staffService.getStaffSignature(this.loggedInUser.sub).subscribe((data: any) => {
    if (data.hasErrors === false) {
      // (data.payload);
      this.classTeacherDetials = data.payload;
    }
  });
}

printPage() {
  const prtContent = document.getElementById('app-results-print');
  const WinPrint = window.open('', '', 'left=0,top=0,height=900,toolbar=0,scrollbars=0,status=0');
  WinPrint.document.write(prtContent.innerHTML);
  WinPrint.document.write('<link rel="stylesheet" href="./print-report.component.css">');
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
  // window.print();
}


exportReport() {
  const data = document.getElementById('app-results-print');
  html2canvas(data).then(canvas => {

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = imageWidth / imageHeight >= pageWidth / pageHeight ? pageWidth / imageWidth : pageHeight / imageHeight;
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, 1800 * ratio, imageHeight * ratio);
      pdf.save(`Report Card For ${this.reportSheetDetails.studentName}.pdf`); // Generated PDF
    });
}


}
