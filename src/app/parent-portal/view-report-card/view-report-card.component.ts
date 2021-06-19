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
  selector: 'app-view-report-card',
  templateUrl: './view-report-card.component.html',
  styleUrls: ['./view-report-card.component.css']
})
export class ViewReportCardComponent implements OnInit {
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
  studentdata: any;
  schoolDetail: any;
  totalExamScoreObtained: any;
  totalCAScoreObtained: any;
  schoolProp: any;
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,
    private parent: ParentsService
  ) { }

  ngOnInit() {
    this.studentdata = this.route.snapshot.queryParams;
    console.log(this.studentdata);
    const {classId, sessionId, studId, termSequenceNumber} = this.studentdata;
    this.selectedClassId = classId;
    this.sessionsId = sessionId,
    this.selectedStudentID = studId;
    this.selectedTermId = termSequenceNumber;

    this.getApprovedStudentResults();
    this.selectStudent();
    this.getClassAndSubjectForTeacher();
    this.getCurrentSesion();
    this.generateGradeSetup();
    this.getSchoolDetialsByID();
    this.getSchoolProperty();

  }
  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        this.classList = data.payload;
        console.log(this.classList);
      }
    }
    );
  }

  getSubjects(event) {
    console.log(this.classList[event]);
    this.selectedClassId = this.classList[event].classId;
    this.selectedClass = this.classList[event].class;
    // tslint:disable-next-line:prefer-for-of

    this.classService.getStudentsInAClassByClassID(this.selectedClassId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.studentList = data.payload;
        console.log(this.classList);
      }
    });

  }

  generateGradeSetup() {
    this.parent.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log('All school grade', data.payload);
        this.gradeSetup = data.payload;
      }
    });
  }

  getCurrentSesion() {
    this.parent.getSchoolSessions().subscribe((data: any) => {
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

  selectStudent() {
      // tslint:disable-next-line:max-line-length
    this.parent.getStudentBehviour(this.sessionsId, this.selectedTermId, this.selectedClassId, this.selectedStudentID  ).subscribe((data: any) => {
     if (data.hasErrors === false) {
       console.log(data.payload);
       this.studentBehaviour = data.payload.resultTypeAndValues;
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
  this.parent.getApprovedStudentResult(this.selectedStudentID, this.selectedClassId, this.sessionsId, this.selectedTermId ).subscribe((data: any) => {
    if (data.hasErrors === false) {
      console.log(data.payload);
      this.reportSheetDetails = data.payload;
      this.studentRecord = data.payload.breakdowns;
      this.subjectoffered = data.payload.subjectOffered;
      this.calculateTotalScoreObtained(this.studentRecord);
      this.getAllSubjectsInAClasses();
      this.assessments = data.payload.breakdowns[0].assesmentAndScores;
      this.getAllAssessments();
      console.log(this.assessments);
    } else {

      this.notifyService.publishMessages(data.errors, 'danger', 1);
    }
  }, error => {
    this.notifyService.publishMessages(error.errors[0], 'danger', 1);

  });
 }

 getAllSubjectsInAClasses() {
   this.classService.getAllSubjectsInAClassByClassID(this.selectedClassId).subscribe((data: any) => {
     if (data.hasErrors === false) {
       const classSubjectCount: any = data.payload;
       console.log(classSubjectCount.length);
       this.classSubjectCount = classSubjectCount.length;
     }
    });
 }
 getAllAssessments() {
  this.parent.getAllAssessmentSetup().subscribe((data: any) => {
    if (data.hasErrors === false) {
      const result: any =  data.payload;
      const caArray = [];
      // console.log(this.subjectoffered);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < result.length; i++) {
        // console.log(result[i].maxScore);
        if (result[i].name.toLowerCase().includes('xam') || result[i].isExam === true) {
          // console.log('yes');
          this.totalExam = result[i].maxScore * this.subjectoffered;
          console.log(this.totalExam);
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
     if (iDonTire[j].assessmentName.toLowerCase().includes('xam') || iDonTire[j].isExam === true) {
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

getSchoolProperty() {
  this.parent.getSchoolLogo().subscribe((data: any) => {
    if (data.hasErrors === false) {
      this.schoolProp = data.payload;
    }
  });
}

printpage() {
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

 this.parent.getSchoolById(id).subscribe( (data: any) => {
    if (data.hasErrors === false) {
      this.schoolDetail = data.payload;
    }
  });
}


}
