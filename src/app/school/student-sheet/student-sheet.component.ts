import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ResultService } from 'src/services/data/result/result.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClassService } from 'src/services/data/class/class.service';


@Component({
  selector: 'app-student-sheet',
  templateUrl: './student-sheet.component.html',
  styleUrls: ['./student-sheet.component.css']
})
export class StudentSheetComponent implements OnInit {
  studId: any;
  studentRecord: any;
  assessments: any;
  studentNameAndReg: any;
  teacherComment = {comment: ''};
  classTeacherWord: any;
  studentBehaviour: any;
  gradeSetup: any;
  totalScoreObtained: number;
  averageScore: number;
  loggedInUser: any;
  classTeacherId: any;
  subjectLenght: number;
  totalSchoolScore: number;
  totalCA: number;
  totalExam: number;


  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private notifyService: NotificationsService,
    private assessmentService: AssessmentService,
    private router: Router,

  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
    
    this.studId = this.route.snapshot.params.id;
    this.studentNameAndReg = JSON.parse(sessionStorage.getItem('student-details'));
    this.studentBehaviour = JSON.parse(sessionStorage.getItem('studentBehaviour'));
    this.getAllAssessments();
    this.getStudentScoreSheet();
    this.generateGradeSetup();
    const records = JSON.parse(sessionStorage.getItem('result-record'));
    // (records);

  }

 

  getStudentScoreSheet() {
    const classId = sessionStorage.getItem('class-id');
    this.resultService.getStudentBroadSheet(this.studId, classId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentRecord = data.payload.breakdowns;
        // (this.studentRecord);
        this.subjectLenght  = this.studentRecord.length;

        this.classTeacherWord = data.payload.classTeacherComment;
        this.classTeacherId = data.payload.classTeacherId;
        // (this.classTeacherWord);
        this.assessments = data.payload.breakdowns[0].assesmentAndScores;
        this.calculateTotalScoreObtained(this.studentRecord);
        this.getAllAssessments();

        // (this.assessments);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'success', 1);

    });
  }

  generateGradeSetup() {
    this.assessmentService.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // ('All school grade', data.payload);
        this.gradeSetup = data.payload;
      }
    });
  }

  submitStudentResult() {
    const ClassId = sessionStorage.getItem('class-id');
    const records: any = JSON.parse(sessionStorage.getItem('result-record'));
    // (records);
    // tslint:disable-next-line:radix
    const classId = parseInt(ClassId);
    const {comment} = this.teacherComment;
    const result = {
      // tslint:disable-next-line:radix
      studentId: parseInt(this.studId),
      sessionId: records.sessionId,
      classId,
      termSequence: records.termSequence,
      classTeacherComment: this.classTeacherWord,
      headTeacherComment: comment,
      // tslint:disable-next-line:radix
      headTeacherId: parseInt(this.loggedInUser.sub),
      // tslint:disable-next-line:radix
      classTeacherId: parseInt(this.classTeacherId),
      classTeacherApprovalStatus: 1,
      adminApprovalStatus: 1,
      headTeacherApprovalStatus: 1
    };

    // (result);

    this.assessmentService.submitStudentResultForApproval(result).subscribe((data: any) => {
        if (data.hasErrors === false) {
          // // (data.payload);
         sessionStorage.removeItem('student-details');
         sessionStorage.removeItem('studentBehaviour');
         sessionStorage.removeItem('result-record');
         this.notifyService.publishMessages(data.payload, 'success', 1);
         this.router.navigateByUrl('/school/grade-book');
        }
    }, error => {
      this.notifyService.publishMessages(error.payload, 'danger', 1);

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
      // this.averageScore = Math.round(((this.totalScoreObtained / this.subjectoffered) * 10) / 10);
      // this.getTotalSchoolScoreForClass();
      // this.getPercentage();
    }
  }

  getAllAssessments() {
    this.assessmentService.getAllAssessmentSetup().subscribe((data: any) => {
      if (data.hasErrors === false) {
       

       const assessmen: any =  data.payload;
      //  // (assessments)
       const caArray = [];
      // // (this.subjectoffered);
      // tslint:disable-next-line:prefer-for-of
       for (let i = 0; i < assessmen.length; i++) {
        // (assessmen[i].maxScore);
        if (assessmen[i].name.toLowerCase().includes('xam')) {
          this.totalExam = assessmen[i].maxScore * this.subjectLenght;
        } else {
          caArray.push(assessmen[i].maxScore * this.subjectLenght);
          this.totalCA = caArray.reduce((a, b) => a + b, 0);
          // // (caArray);
        }
        this.totalSchoolScore = this.totalCA + this.totalExam;
      }}
    });
  }



  back() {
    window.history.back();
  }
}
