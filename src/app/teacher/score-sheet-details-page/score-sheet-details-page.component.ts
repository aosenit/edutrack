import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ResultService } from 'src/services/data/result/result.service';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';

@Component({
  selector: 'app-score-sheet-details-page',
  templateUrl: './score-sheet-details-page.component.html',
  styleUrls: ['./score-sheet-details-page.component.css']
})
export class ScoreSheetDetailsPageComponent implements OnInit {
  studId: any;
  studentRecord: any;
  assessments: any;
  studentNameAndReg: any;
  studentResultForm: FormGroup;
  teacherComment = {comment: ''};
  constructor(

    private route: ActivatedRoute,
    private resultService: ResultService,
    private notifyService: NotificationsService,
    private assessmentService: AssessmentService,


  ) { }

  ngOnInit() {
    this.studId = this.route.snapshot.params.id;
    this.studentNameAndReg = JSON.parse(sessionStorage.getItem('student-details'));
    console.log(this.studentNameAndReg);
    this.getStudentScoreSheet();

    // this.studentResultForm = this.fb.group({
    //   teacherComment: ['', Validators.required]
    // });

  }

  getStudentScoreSheet() {
    const classId = sessionStorage.getItem('class-id');
    this.resultService.getStudentBroadSheet(this.studId, classId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.studentRecord = data.payload.breakdowns;
        this.assessments = data.payload.breakdowns[0].assesmentAndScores;
        console.log(this.assessments);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'success', 1);

    });
  }

  submitStudentResult() {
    const ClassId = sessionStorage.getItem('class-id');
    // tslint:disable-next-line:radix
    const classId = parseInt(ClassId);
    const {comment} = this.teacherComment;
    const result = {
      headTeacherComment: '',
      classTeacherComment: comment,
      // tslint:disable-next-line:radix
      studentId: parseInt(this.studId),
      sessionId: 0,
      classId,
      termSequence: 0,
      classTeacherApprovalStatus: 1,
      adminApprovalStatus: 0,
      headTeacherApprovalStatus: 0
    };

    console.log(result);

    this.assessmentService.submitStudentResultForApproval(result).subscribe((data: any) => {
        if (data.hasErrors === false) {
          console.log(data.payload);
          this.notifyService.publishMessages(data.payload, 'success', 1);
        }
    }, error => {
      this.notifyService.publishMessages(error.payload, 'danger', 1);

    });
  }

  back() {
    window.history.back();
  }
}
