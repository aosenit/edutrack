import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-school-grade-book',
  templateUrl: './school-grade-book.component.html',
  styleUrls: ['./school-grade-book.component.css']
})
export class SchoolGradeBookComponent implements OnInit {
  noData = true;
  displayData = false;
  sessionList: any;
  terms: any;
  levels: any;
  classList: any;
  Classid: any;
  studentData: any;
  subjectList: any;
  subject: any;
  cummlativeScore: any;
  approvalForm: FormGroup;
  rejectionForm: FormGroup;
  className: any;
  gradeSetup: any;
  sessions: any;
  termName: any;
  selectedTermId: any;
  studentBehaviour: any;
  selectedStudentId: any;



  constructor(
    private assessmentService: AssessmentService,
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private resultService: ResultService,
    private notifyService: NotificationsService,
    private fb: FormBuilder,
    private router: Router





  ) { }

  ngOnInit() {
    this.getCurrentSesion();
    this.generateGradeSetup();
    this.getSections();

    this.approvalForm = this.fb.group({
      headTeacherApprovalComment: ['', Validators.required]
    });

    this.rejectionForm = this.fb.group({
      headTeacherRejectionComment: ['', Validators.required]
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

  getCurrentSesion() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessions = data.payload;
        this.terms = data.payload.terms;
      }
    });
  }





  getSections() {
    this.schoolSectionService.getSection().subscribe(
      (res: any) => {
        // tslint:disable-next-line:no-string-literal
        this.levels = res['payload'];
        // this.levels = this.levels.reverse();
        // ('levels', this.levels);
      }
    );
  }

  getClassBySectionId(id) {
    // (id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classList = data.payload;
          // (this.classList);

        }
      });

  }

  getSubjectsAndStudents(id) {
    // ('class id ');
    this.Classid = id;
    sessionStorage.setItem('class-id', this.Classid);

    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.className = data.payload[0].class;
        this.noData = false;
        this.displayData = true;
        this.getBroadSheet();
      }
    });
  }


  selectedTerm(event) {
    this.termName = this.terms[event];
    this.selectedTermId = this.terms[event].sequenceNumber;


   }

  getBroadSheet() {
    this.resultService.getStudentBroadSheetApprovedByTEacher(this.Classid).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentData = data.payload;
        // (this.studentData);
        this.subject = this.studentData[0].assessmentAndScores;
        // ('subjects', this.subject);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.studentData.length; i++) {
          const arr = [];
          this.studentData[i].assessmentAndScores.forEach(element => {
            arr.push(element.score);
            this.cummlativeScore = arr.reduce((a, b) => a + b, 0);
            this.studentData[i].cummulative = this.cummlativeScore;
          });
        }
        // // ();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  approvalResult() {
    const {headTeacherApprovalComment} = this.approvalForm.value;
    // tslint:disable-next-line:radix
    const classId = parseInt(this.Classid);

    const result = {
      headTeacherComment: headTeacherApprovalComment,
      classTeacherComment: '',
      classId,
      termSequence: 0,
      classTeacherApprovalStatus: 1,
      adminApprovalStatus: 1,
      headTeacherApprovalStatus: 1
    };

    // (result);
    this.assessmentService.approveClassResult(result).subscribe((data: any) => {
      // (data);
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Result approved', 'success', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.payload, 'danger', 1);
    });
  }

  rejectResult() {
    const {headTeacherRejectionComment} = this.rejectionForm.value;
    // tslint:disable-next-line:radix
    const classId = parseInt(this.Classid);

    const result = {
      headTeacherComment: headTeacherRejectionComment,
      classTeacherComment: '',
      classId,
      termSequence: 0,
      classTeacherApprovalStatus: 1,
      adminApprovalStatus: 1,
      headTeacherApprovalStatus: 2
    };

    // (result);
    this.assessmentService.approveClassResult(result).subscribe((data: any) => {
      // (data);
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Result rejected', 'success', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.payload, 'danger', 1);
    });
  }

  saveStudentDetails(u) {
    // (this.studentData[u]);
    this.selectedStudentId = this.studentData[u].studentId;
    sessionStorage.setItem('student-details', JSON.stringify(this.studentData[u]) );
    const records = {
      sessionId: this.sessions.id,
      termSequence: this.selectedTermId,
      classId: this.Classid,
      studentId: this.selectedStudentId
    };
    sessionStorage.setItem('result-record', JSON.stringify(records) );
    setTimeout(() => {

      this.router.navigateByUrl('/school/student-sheet/' + this.selectedStudentId);
    }, 2000);



    // tslint:disable-next-line:max-line-length
    this.resultService.getStudentBehviour(this.sessions.id, this.selectedTermId, this.Classid, this.selectedStudentId ).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        this.studentBehaviour = data.payload.resultTypeAndValues;
        sessionStorage.setItem('studentBehaviour', JSON.stringify(this.studentBehaviour));
       //  this.studentRecord = data.payload.breakdowns;
       //  this.assessments = data.payload.breakdowns[0].assesmentAndScores;
       //  // (this.assessments);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

}
