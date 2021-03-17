import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {
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
  subjectoffered: number;
  averageScore: number;
  totalSchoolScore: number;
  totalCA: number;
  totalExam: number;
  classPercentage: number;
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,
  ) { }

  ngOnInit() {
    this.getClassAndSubjectForTeacher();
    this.getCurrentSesion();
    this.generateGradeSetup();
    // this.getApprovedStudentResults();
    console.log('route', this.route);


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
    this.assessmentService.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log('All school grade', data.payload);
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

  selectStudent(i) {
    this.selectedStudent = this.studentList[i];
    this.selectedStudentID = this.studentList[i].id;
    // tslint:disable-next-line:max-line-length
    this.resultService.getStudentBehviour(this.sessionsId, this.selectedTermId, this.selectedClassId, this.selectedStudentID  ).subscribe((data: any) => {
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
  this.resultService.getApprovedStudentResult(this.selectedStudentID, this.selectedClassId, this.sessionsId, this.selectedTermId ).subscribe((data: any) => {
    if (data.hasErrors === false) {
      console.log(data.payload);
      this.reportSheetDetails = data.payload;
      this.studentRecord = data.payload.breakdowns;
      this.subjectoffered = data.payload.subjectOffered;
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
   this.classService.getAllSubjectsInAClassByClassID(this.selectedClassId).subscribe((data: any) => {
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

  const firstCA = this.subjectoffered * 20;
  const secondCA = (this.subjectoffered * 20);
  const thirdCA = (this.subjectoffered * 20);
  const exam = (this.subjectoffered * 40);
  this.totalSchoolScore = firstCA + secondCA + thirdCA + exam;
  this.totalCA = firstCA + secondCA + thirdCA;
  this.totalExam = exam;
  this.getTotalExamScore( );
}

getTotalExamScore() {
  const data: any = this.studentRecord;
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].assesmentAndScores);
  }
}

getPercentage() {
   this.classPercentage  = Math.round((this.totalScoreObtained / this.totalSchoolScore ) * 100) ;
   console.log(this.classPercentage);
}

}
