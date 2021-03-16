import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { ResultService } from 'src/services/data/result/result.service';

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
    console.log(this.sessionId);
    this.termList = this.sessionList[i].terms;
  }

  getWardReportCard(event) {

    this.selectedTermId = event;
    this.selectStudent();
    this.getApprovedStudentResults();
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
    this.assessmentService.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log('All school grade', data.payload);
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
   console.log(this.sessionId);
   this.selectedTermId = this.terms[event].sequenceNumber;
  }

  selectStudent() {
    // this.selectedStudent = this.studentList[i];
    // this.selectedStudentID = this.studentList[i].id;
    // tslint:disable-next-line:max-line-length
    console.log(this.sessionId);
    // tslint:disable-next-line:max-line-length
    this.parentService.getStudentBehviour(this.sessionId, this.selectedTermId, this.wardDetails.classID, this.wardDetails.id  ).subscribe((data: any) => {
     if (data.hasErrors === false) {
       console.log(data.payload);
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
      console.log(data.payload);
      this.reportSheetDetails = data.payload;
      this.studentRecord = data.payload.breakdowns;
      this.subjectoffered = data.payload.subjectOffered;
      // this.studentName = data.payload.studentName;
      this.calculateTotalScoreObtained(this.studentRecord);
      this.getAllSubjectsInAClasses();
      this.assessments = data.payload.breakdowns[0].assesmentAndScores;
      const caArray = [];
      const examArray = [];
      console.log(this.assessments);
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
       console.log(classSubjectCount.length);
       this.classSubjectCount = classSubjectCount.length;
     }
    });
 }

calculateTotalScoreObtained(data) {
  const totalScore = [];
  const totalExamScore = [];
  // tslint:disable-next-line:prefer-for-of
  for ( let i = 0; i < data.length; i++) {
    totalScore.push(data[i].cummulativeScore);
    totalExamScore.push(data[i].cummulativeScore);
    this.totalScoreObtained = totalScore.reduce((a, b) => a + b, 0);
    this.averageScore = Math.round(((this.totalScoreObtained / this.subjectoffered) * 10) / 10);
    this.getRate();
    this.getTotalSchoolScoreForClass();
    this.getPercentage();
  }
}

getRate() {
  this.performanceRate = (this.classPercentage / 100) * 5;
}

getStatus() {

}

getTotalSchoolScoreForClass() {

  const firstCA = 10 * 20;
  console.log(firstCA);
  const secondCA = (10 * 20);
  const thirdCA = (10 * 20);
  const exam = (10 * 40);
  this.totalSchoolScore = firstCA + secondCA + thirdCA + exam;
  this.totalCA = firstCA + secondCA + thirdCA;
  this.totalExam = exam;
}


getPercentage() {
   this.classPercentage  = Math.round((this.totalScoreObtained / this.totalSchoolScore ) * 100) ;
}


}
