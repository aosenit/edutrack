import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/services/data/class/class.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ResultService } from 'src/services/data/result/result.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';


@Component({
  selector: 'app-student-score-sheet',
  templateUrl: './student-score-sheet.component.html',
  styleUrls: ['./student-score-sheet.component.css']
})
export class StudentScoreSheetComponent implements OnInit {
  classList: any;
  studentList: any;
  gradeSetup: any;
  selectedStudent: any;
  studentRecord: any;
  assessments: any;
  selectedClassId: any;

  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,


  ) { }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('#dropdownMenuLink').on('show.bs.dropdown', function() {
      $(`#dropdownMenuLink`).show();

    });
    this.getClassAndSubjectForTeacher();
    this.generateGradeSetup();

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

  getSubjects(id) {
    this.selectedClassId = id;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i].class === id) {
       console.log('assas', this.classList[i]);
      }
    }
    this.classService.getStudentsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.studentList = data.payload;
        console.log(this.classList);
      }
    });



  }

  selectStudent(i) {
     this.selectedStudent = this.studentList[i];
     this.resultService.getStudentBroadSheet(this.selectedStudent.id, this.selectedClassId).subscribe((data: any) => {
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

  // getStudentScoreSheet() {
  //   const classId = sessionStorage.getItem('class-id');
  //   this.resultService.getStudentBroadSheet(this.studId, classId).subscribe((data: any) => {
  //     if (data.hasErrors === false) {
  //       console.log(data);
  //       this.studentRecord = data.payload.breakdowns;
  //       this.assessments = data.payload.breakdowns[0].assesmentAndScores;
  //       console.log(this.assessments);
  //     }
  //   }, error => {
  //     this.notifyService.publishMessages(error.errors, 'success', 1);

  //   });
  // }


  generateGradeSetup() {
    this.assessmentService.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log('All school grade', data.payload);
        this.gradeSetup = data.payload;
      }
    });
  }

  holdDropDown() {
    $(`#dropdownMenuLink${1}`).addClass('show-pop');

  }
}
