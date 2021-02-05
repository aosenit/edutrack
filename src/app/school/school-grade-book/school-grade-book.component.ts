import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
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



  constructor(
    private assessmentService: AssessmentService,
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private resultService: ResultService,
    private notifyService: NotificationsService,
    private fb: FormBuilder





  ) { }

  ngOnInit() {
    this.getSession();
    this.getSections();

    this.approvalForm = this.fb.group({
      headTeacherApprovalComment: ['', Validators.required]
    });

    this.rejectionForm = this.fb.group({
      headTeacherRejectionComment: ['', Validators.required]
    });
  }

  getSession() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.sessionList = data.payload;
        this.terms = this.sessionList[0].terms;
        console.log(this.terms);
      }
    });
  }

  getSections() {
    this.schoolSectionService.getSection().subscribe(
      (res: any) => {
        // tslint:disable-next-line:no-string-literal
        this.levels = res['payload'];
        // this.levels = this.levels.reverse();
        console.log('levels', this.levels);
      }
    );
  }

  getClassBySectionId(id) {
    console.log(id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classList = data.payload;
          console.log(this.classList);

        }
      });

  }

  getSubjectsAndStudents(id) {
    console.log('class id ');
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

  getBroadSheet() {
    this.resultService.getClassBroadSheet(this.Classid).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentData = data.payload;
        console.log(this.studentData);
        this.subject = this.studentData[0].assessmentAndScores;
        console.log('subjects', this.subject);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.studentData.length; i++) {
          const arr = [];
          this.studentData[i].assessmentAndScores.forEach(element => {
            arr.push(element.score);
            this.cummlativeScore = arr.reduce((a, b) => a + b, 0);
            this.studentData[i].cummulative = this.cummlativeScore;
          });
        }
        // console.log();
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

    console.log(result);
    this.assessmentService.approveClassResult(result).subscribe((data: any) => {
      console.log(data);
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

    console.log(result);
    this.assessmentService.approveClassResult(result).subscribe((data: any) => {
      console.log(data);
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Result rejected', 'success', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.payload, 'danger', 1);
    });
  }

  saveStudentDetails(u) {
    console.log(this.studentData[u]);
    sessionStorage.setItem('student-details', JSON.stringify(this.studentData[u]) );
  }

}
