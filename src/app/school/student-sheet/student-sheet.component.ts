import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ResultService } from 'src/services/data/result/result.service';

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


  constructor(
    private route: ActivatedRoute,
    private resultService: ResultService,
    private notifyService: NotificationsService,
    private assessmentService: AssessmentService,
    private router: Router

  ) { }

  ngOnInit() {
    this.studId = this.route.snapshot.params.id;
    this.studentNameAndReg = JSON.parse(sessionStorage.getItem('student-details'));
    this.studentBehaviour = JSON.parse(sessionStorage.getItem('studentBehaviour'));
    console.log(this.studentNameAndReg);
    this.getAllAssessments();
    this.getStudentScoreSheet();
    this.generateGradeSetup();
    const records = JSON.parse(sessionStorage.getItem('result-record'));
    console.log(records);

  }

  getStudentScoreSheet() {
    const classId = sessionStorage.getItem('class-id');
    this.resultService.getStudentBroadSheet(this.studId, classId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.studentRecord = data.payload.breakdowns;
        this.classTeacherWord = data.payload.classTeacherComment;
        console.log(this.classTeacherWord);
        // this.assessments = data.payload.breakdowns[0].assesmentAndScores;
        this.calculateTotalScoreObtained(this.studentRecord);

        console.log(this.assessments);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'success', 1);

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

  submitStudentResult() {
    const ClassId = sessionStorage.getItem('class-id');
    const records: any = JSON.parse(sessionStorage.getItem('result-record'));
    console.log(records);
    // tslint:disable-next-line:radix
    const classId = parseInt(ClassId);
    const {comment} = this.teacherComment;
    const result = {
      // tslint:disable-next-line:radix
      studentId: parseInt(this.studId),
      sessionId: records.sessionId,
      classId,
      termSequence: records.termSequence,
      classTeacherComment: '',
      headTeacherComment: comment,
      classTeacherApprovalStatus: 1,
      adminApprovalStatus: 1,
      headTeacherApprovalStatus: 1
    };

    console.log(result);

    this.assessmentService.submitStudentResultForApproval(result).subscribe((data: any) => {
        if (data.hasErrors === false) {
          console.log(data.payload);
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
       this.assessments = data.payload;
      }
    });
  }


  back() {
    window.history.back();
  }
}
