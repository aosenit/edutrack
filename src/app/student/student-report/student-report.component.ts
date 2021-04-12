import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SchoolService } from 'src/services/data/school/school.service';


@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css']
})
export class StudentReportComponent implements OnInit {
  studentDetails: any;

  noData = true;
  displayData = false;
  noresult = false;

  schoolLogo: any;
  schoolname: any;

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
  loggedInUser: any;
  schoolDetail: any;
  totalExamScoreObtained: any;
  totalCAScoreObtained: any;

  constructor(
    private resultService: ResultService,
    private schoolService: SchoolService,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,
    private classService: ClassService,



  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.studentDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.getSchoolProperties();
    this.getSchoolDetialsByID();
    this.getClassAndSubjectForTeacher();
    this.getCurrentSesion();
    this.generateGradeSetup();

  }

  getSchoolProperties() {
    this.schoolService.getSchoolLogo(this.studentDetails.TenantId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.paylaod);
        this.schoolLogo = data.payload.logo;
        sessionStorage.setItem('prop', this.schoolLogo);
        this.schoolname = data.payload.schoolName;
      }
    });
  }

  getSchoolDetialsByID() {
    this.schoolService.getSchoolById(this.studentDetails.TenantId).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.schoolDetail = data.payload;
      }
    });
  }


  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        this.classList = data.payload;
        // console.log(this.classList);
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
   // tslint:disable-next-line:max-line-length
   this.resultService.getBehaviourForStudent(this.sessionsId, this.selectedTermId, this.studentDetails.StudentClassId, this.studentDetails.sub  ).subscribe((data: any) => {
     if (data.hasErrors === false) {
      this.noData = false;
      this.displayData = true;
     //  console.log(data.payload);
      this.studentBehaviour = data.payload.resultTypeAndValues;
      this.getApprovedStudentResults();
     //  this.studentRecord = data.payload.breakdowns;
     //  this.assessments = data.payload.breakdowns[0].assesmentAndScores;
     //  console.log(this.assessments);
    } else {
      this.noData = false;
      this.noresult = true;
      this.displayData = false;
    }
  }, error => {
    this.notifyService.publishMessages(error.errors, 'danger', 1);
    this.noData = false;
    this.noresult = true;
    this.displayData = false;

  });
  }

  selectStudent(i) {
    this.selectedStudent = this.studentList[i];
    this.selectedStudentID = this.studentList[i].id;
    // tslint:disable-next-line:max-line-length

 }


 getApprovedStudentResults() {
  // tslint:disable-next-line:max-line-length
  this.resultService.getApprovedResultForStudent(this.studentDetails.sub, this.studentDetails.StudentClassId, this.sessionsId, this.selectedTermId ).subscribe((data: any) => {
    if (data.hasErrors === false) {
      this.noData = false;
      this.displayData = true;
      this.noresult = false;
      // console.log(data.payload);
      this.reportSheetDetails = data.payload;
      this.studentRecord = data.payload.breakdowns;
      this.subjectoffered = data.payload.subjectOffered;
      this.getAllSubjectsInAClasses();
      this.calculateTotalScoreObtained(this.studentRecord);
      this.getAllAssessments();

      this.assessments = data.payload.breakdowns[0].assesmentAndScores;

      // console.log(this.assessments);
    } else {

      this.notifyService.publishMessages(data.errors, 'danger', 1);
      this.noData = false;
      this.noresult = true;
      this.displayData = false;
    }
  }, error => {
    this.notifyService.publishMessages(error.errors[0], 'danger', 1);

  });
 }

 getAllSubjectsInAClasses() {
   this.classService.getAllSubjectsInAClassByClassID(this.studentDetails.sub).subscribe((data: any) => {
     if (data.hasErrors === false) {
       const classSubjectCount: any = data.payload;
      //  console.log(classSubjectCount.length);
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
      // console.log(this.subjectoffered);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < result.length; i++) {
        // console.log(result[i].maxScore);
        if (result[i].name.toLowerCase().includes('xam')) {
          this.totalExam = result[i].maxScore * this.subjectoffered;
        } else {
          caArray.push(result[i].maxScore * this.subjectoffered);
          this.totalCA = caArray.reduce((a, b) => a + b, 0);
          // console.log(caArray);
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
 //  console.log(this.classPercentage);
}

getRate() {
  this.performanceRate = (this.classPercentage / 100) * 5;
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




}
