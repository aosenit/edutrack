import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-mail-report-card',
  templateUrl: './mail-report-card.component.html',
  styleUrls: ['./mail-report-card.component.css']
})
export class MailReportCardComponent implements OnInit {
  boxChecked = false;
  classList: any;
  studentList: any;
  sessions: any;
  terms: any;
  classId: any;
  selectedTermId: any;
  StudentIds = [];
  loggedInUser: any;
  constructor(
    private classService: ClassService,
    private assessmentService: AssessmentService,
    private resultService: ResultService,
    private notifyService: NotificationsService,
    private route: ActivatedRoute




  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
    this.getClassAndSubjectForTeacher();
    this.getCurrentSesion();

  }

  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        this.classList = data.payload;
      }
    }
    );
  }

  getSubjects(id) {
    this.classId = id;

  }

  getCurrentSesion() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessions = data.payload;
        this.terms = data.payload.terms;
      }
    });
  }

  selectedTerm(event) {
    this.selectedTermId = this.terms[event].sequenceNumber;
    this.getApprovedStudentResults();

  }


  checked(event, i) {
    if (event.target.checked === true) {
      this.StudentIds.push(event.target.value);

      document.getElementById('customtable' + `${i}`).style.borderLeft = '5px solid #FB7B04';
      this.boxChecked = true;
    } else {
      const index = this.StudentIds.indexOf(event.target.value);
      if (index > -1) {
        this.StudentIds.splice(index, 1);
      }
      this.StudentIds.filter((item) => item !== i);
      document.getElementById('customtable' + `${i}`).style.borderLeft = 'none';
    }
    if (this.StudentIds.length === 0) {
      this.boxChecked = false;
    }
  }

  selectAllBoxes(e) {
    const allBoxes: any = document.getElementsByName('boxes');
    if (e.target.checked === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < allBoxes.length; index++) {
        if (allBoxes[index].type === 'checkbox') {
          allBoxes[index].checked = true;
          document.getElementById('customtable' + `${index}`).style.borderLeft = '5px solid #FB7B04';
          this.boxChecked = true;
          this.StudentIds.push(allBoxes[index].value);
        }
      }
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < allBoxes.length; index++) {
        if (allBoxes[index].type === 'checkbox') {

          allBoxes[index].checked = false;
          document.getElementById('customtable' + `${index}`).style.borderLeft = '0px';
          this.boxChecked = false;
          this.StudentIds = [];
        }
      }

    }
  }

  getApprovedStudentResults() {
    // tslint:disable-next-line:max-line-length
    this.resultService.getStudentApprovedResults(this.loggedInUser.TeacherClassId, this.sessions.id, this.selectedTermId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentList = data.payload;
      } else {

        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }



  postMaiToParent() {
    document.getElementById('exampleModalCenterEndClass').click();
    const studentId = this.StudentIds.map((ids: any) => {
      return parseInt(ids);
    });
    const result = {
      studentIds: studentId,
      resultPageURL: 'http://school-track-1.vercel.app/#/parent/parent-portal/view-report-card',
      classId: parseInt(this.loggedInUser.TeacherClassId),
      curSessionId: this.sessions.id,
      termSequenceNumber: this.selectedTermId
    };
    console.log(result);
    this.resultService.mailReportSheetToParent(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Email sent out', 'success', 1);
        document.getElementById('closeMailModal').click();
        location.reload();
      } else {
        this.notifyService.publishMessages('Email processing failed', 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }
}
