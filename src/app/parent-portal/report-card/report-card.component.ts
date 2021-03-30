import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { ResultService } from 'src/services/data/result/result.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {
noData = true;
wardRecord = false;
  sessionList: any;
  sessionId: any;
  termList: any;
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
  performanceRate: number;
  selectedStudentID: any;
  sessionsId: any;
  classSubjectCount: number;
  subjectoffered: any;
  averageScore: number;
  totalSchoolScore: number;
  totalCA: number;
  totalExam: number;
  classPercentage: number;
  wardDetails: any;
  studentName: any;
  schoolProp: any;
  schoolDetail: any;
  totalExamScoreObtained: any;
  totalCAScoreObtained: any;
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,
    private parentService: ParentsService
  ) { }

  ngOnInit() {
   this.wardDetails = JSON.parse(sessionStorage.getItem('ward'));
   this.getSession();
   this.getSchoolDetialsByID();
  }




  getSession() {
    this.parentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessionList = data.payload;
        // console.log(this.terms);
      }
    });
  }

  getTerms(i) {
    console.log(this.sessionList[i]);
    this.sessionId = this.sessionList[i].id;
    // console.log(this.sessionId);
    this.termList = this.sessionList[i].terms;
  }

  getWardReportCard(event) {

    this.selectedTermId = event;
    this.selectStudent();
    this.getApprovedStudentResults();
    this.getSchoolProperty();
  }


  getSubjects(event) {
    console.log(this.classList[event]);
    this.selectedClassId = this.classList[event].classId;
    this.selectedClass = this.classList[event].class;
    // tslint:disable-next-line:prefer-for-of

    this.classService.getStudentsInAClassByClassID(this.selectedClassId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        this.studentList = data.payload;
        // console.log(this.classList);
      }
    });

  }

  generateGradeSetup() {
    this.assessmentService.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log('All school grade', data.payload);
        this.gradeSetup = data.payload;
      }
    });
  }

  getCurrentSesion() {
    this.parentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessions = data.payload;
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
   this.sessionsId = this.terms[event].id;
  //  console.log(this.sessionId);
   this.selectedTermId = this.terms[event].sequenceNumber;
  }

  selectStudent() {
    // this.selectedStudent = this.studentList[i];
    // this.selectedStudentID = this.studentList[i].id;
    // tslint:disable-next-line:max-line-length
    // console.log(this.sessionId);
    // tslint:disable-next-line:max-line-length
    this.parentService.getStudentBehviour(this.sessionId, this.selectedTermId, this.wardDetails.classID, this.wardDetails.id  ).subscribe((data: any) => {
     if (data.hasErrors === false) {
      //  console.log(data.payload);
       this.studentBehaviour = data.payload.resultTypeAndValues;
       this.getApprovedStudentResults();
      //  this.studentRecord = data.payload.breakdowns;
      //  this.assessments = data.payload.breakdowns[0].assesmentAndScores;
      //  console.log(this.assessments);
     }
   }, error => {
     this.notifyService.publishMessages(error.errors, 'danger', 1);

   });
 }


 getApprovedStudentResults() {
  // tslint:disable-next-line:max-line-length
  this.parentService.getApprovedStudentResult(this.wardDetails.id, this.wardDetails.classID, this.sessionId, this.selectedTermId ).subscribe((data: any) => {
    if (data.hasErrors === false) {
      this.wardRecord = true;
      this.noData = false;
      this.reportSheetDetails = data.payload;
      this.studentRecord = data.payload.breakdowns;
      // console.log('student record', this.studentRecord);
      this.subjectoffered = data.payload.subjectOffered;
      // this.studentName = data.payload.studentName;
      this.getAllSubjectsInAClasses();
      this.calculateTotalScoreObtained(this.studentRecord);
      this.getAllAssessments();
      this.assessments = data.payload.breakdowns[0].assesmentAndScores;

      // console.log(this.assessments);
    } else {

      this.notifyService.publishMessages(data.errors, 'danger', 1);
    }
  }, error => {
    this.notifyService.publishMessages(error.errors[0], 'danger', 1);

  });
 }

 getAllSubjectsInAClasses() {
   this.parentService.getAllSubjectsInAClassByClassID(this.wardDetails.classID).subscribe((data: any) => {
     if (data.hasErrors === false) {
       const classSubjectCount: any = data.payload;
      //  console.log(classSubjectCount.length);
       this.classSubjectCount = classSubjectCount.length;
     }
    });
 }

 getAllAssessments() {
  this.parentService.getAllAssessmentSetup().subscribe((data: any) => {
    if (data.hasErrors === false) {
      const result: any =  data.payload;
      const caArray = [];
      // console.log(this.subjectoffered);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < result.length; i++) {
        // console.log(result[i].maxScore);
        if (result[i].name.toLowerCase().includes('xam')) {
          // console.log('yes');
          this.totalExam = result[i].maxScore * this.subjectoffered;
        } else {
          caArray.push(result[i].maxScore * this.subjectoffered);
          this.totalCA = caArray.reduce((a, b) => a + b, 0);

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
  // console.log('percentage', this.classPercentage);

}

getRate() {
  this.performanceRate = (this.classPercentage / 100) * 5;
}

getStatus() {

}



getTotalSchoolScoreForClass() {
  this.totalSchoolScore = this.totalCA + this.totalExam;
  // console.log(this.totalSchoolScore);

  this.getTotalExamScore( );
  // console.log('ll scores', this.totalSchoolScore);

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
    //  console.log(iDonTire[j]);
     if (iDonTire[j].assessmentName.toLowerCase().includes('xam')) {
      // console.log('yes');
      examArray.push(iDonTire[j].studentScore);
      this.totalExamScoreObtained = examArray.reduce((a, b) => a + b, 0);
      // console.log(examArray);
    } else {
      caArray.push(iDonTire[j].studentScore);
      this.totalCAScoreObtained = caArray.reduce((a, b) => a + b, 0);
      // console.log(caArray);

    }
    }
  }
}


printCard() {
  const prtContent = document.getElementById('reportHolder');
  const newStyle = document.createElement('panel');
  newStyle.setAttribute('type', 'text/css');
  newStyle.setAttribute('media', 'print');
  newStyle.append(prtContent);
  console.log(prtContent);
  const WinPrint = window.open('', '');
  WinPrint.document.write(newStyle.innerHTML);
  WinPrint.document.close();
  WinPrint.focus();
  WinPrint.print();
  WinPrint.close();
}

getSchoolProperty() {
  this.parentService.getSchoolLogo().subscribe((data: any) => {
    if (data.hasErrors === false) {
      this.schoolProp = data.payload;
    }
  });
}

exportReport() {
  const data = document.getElementById('reportCard');
  html2canvas(data).then(canvas => {

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = imageWidth / imageHeight >= pageWidth / pageHeight ? pageWidth / imageWidth : pageHeight / imageHeight;
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth * ratio, imageHeight * ratio);
      pdf.save(`Report Card For ${this.reportSheetDetails.studentName}.pdf`); // Generated PDF
    });
}

getSchoolDetialsByID() {
  const id = sessionStorage.getItem('tenant');
  this.parentService.getSchoolById(id).subscribe( (data: any) => {
     if (data.hasErrors === false) {
       this.schoolDetail = data.payload;
     }
   });
 }

}
