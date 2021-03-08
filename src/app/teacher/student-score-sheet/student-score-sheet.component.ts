import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/services/data/class/class.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ResultService } from 'src/services/data/result/result.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


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
  cognitive = [
    {name: 'Analysis', value: ''},
    {name: 'Application', value: ''},
    {name: 'Synthesis', value: ''}
  ];
  affective = [
    {name: 'Characteristics', value: ''},
    {name: 'Organization', value: ''},
    {name: 'Receiving', value: ''},
    {name: 'Responding', value: ''},
    {name: 'Valueing', value: ''}
  ];
  Psycomotor  = [
    {name: 'Fundamental', value: ''},
    {name: 'Non-discursive', value: ''},
    {name: 'Perceptual', value: ''},
    {name: 'Reflex', value: ''},
    {name: 'Skilled', value: ''}
  ];
  CongitiveBehaviour = {};
  PyschomotorBehaviour = {};
  AffectiveBehaviour = {};
  cognitiveForm: FormGroup;
  affectiveForm: FormGroup;
  psychomotorForm: FormGroup;
  name: any;
  cognitiveValue: any;
  nameFeeling: string;
  feelingValue: string;
  kineticeName: string;
  psychoValue: string;
  sessions: any;
  terms: any;
  termName: any;
  selectedClass: any;
  selectedTermId: any;
  teacherComment = {comment: ''};

  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private resultService: ResultService,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,
    private fb: FormBuilder,



  ) { }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('#dropdownMenuLink').on('show.bs.dropdown', function() {
      $(`#dropdownMenuLink`).show();

    });
    this.getClassAndSubjectForTeacher();
    this.generateGradeSetup();
    this.populteCognitiveForm();
    this.populteAffectiveForm();
    this.popultePsychomotorForm();
    this.getCurrentSesion();
  }


  populteCognitiveForm() {
    this.cognitiveForm = this.fb.group({
      cognit: ['', Validators.required]
    });
  }
  populteAffectiveForm() {
    this.affectiveForm = this.fb.group({
      feeling: ['', Validators.required]
    });
  }
  popultePsychomotorForm() {
    this.psychomotorForm = this.fb.group({
      kinetics: ['', Validators.required]
    });
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

  getCurrentSesion() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessions = data.payload;
        this.terms = data.payload.terms;
      }
    });
  }

  selectedTerm(event) {
   this.termName = this.terms[event];
   this.selectedTermId = this.terms[event].sequenceNumber;
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
      this.notifyService.publishMessages(error.errors, 'danger', 1);

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
  getAge(birthDate: any) {
    const currentYear = new Date();
    const diff = currentYear.getFullYear() - new Date(birthDate).getFullYear();
    // return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    return diff;
  }


  generateGradeSetup() {
    this.assessmentService.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log('All school grade', data.payload);
        this.gradeSetup = data.payload;
      }
    });
  }

  getAssessmentName(event, u) {
    this.name = this.cognitive[u].name;
    this.cognitiveValue = event;
    $(`#dropdownMenuLink${u}`).addClass('show-pop');

  }

  holdDropDown(i ) {
    $(`#dropdownMenuLink${i}`).addClass('show-pop');

  }

  close(i ) {
    $(`#dropdownMenuLink${i}`).removeClass('show-pop');
    console.log(this.cognitiveForm.value);
    if (this.cognitive[i].name === this.name) {
     this.cognitive[i].value = this.cognitiveValue;
     this.cognitive[i].value = this.cognitiveValue;
    }
    this.CongitiveBehaviour = [
      {
        behaviourName: this.cognitive[0].name,
        grade: this.cognitive[0].value
      },
      {
        behaviourName: this.cognitive[1].name,
        grade: this.cognitive[1].value
      },
      {
        behaviourName: this.cognitive[2].name,
        grade: this.cognitive[2].value
      }
    ];
    console.log(this.CongitiveBehaviour);
  }


  getFeelingValue(event, u) {
    this.nameFeeling = this.affective[u].name;
    this.feelingValue = event;
    $(`#dropdownMenuLink2${u}`).addClass('show-pop');

  }

  holdDropDownFeeling(i ) {
    $(`#dropdownMenuLink2${i}`).addClass('show-pop');

  }

  closeFeeling(feel ) {
    $(`#dropdownMenuLink2${feel}`).removeClass('show-pop');
    console.log(this.affectiveForm.value);
    if (this.affective[feel].name === this.nameFeeling) {
     this.affective[feel].value = this.feelingValue;
    }
    this.AffectiveBehaviour = [
      {
        behaviourName: this.affective[0].name,
        grade: this.affective[0].value
      },
      {
        behaviourName: this.affective[1].name,
        grade: this.affective[1].value
      },
      {
        behaviourName: this.affective[2].name,
        grade: this.affective[2].value
      },
      {
        behaviourName: this.affective[3].name,
        grade: this.affective[3].value
      },
      {
        behaviourName: this.affective[4].name,
        grade: this.affective[4].value
      },
    ];
    console.log(this.AffectiveBehaviour);
  }


  getPyschomotoroValue(event, u) {
    this.kineticeName = this.Psycomotor[u].name;
    this.psychoValue = event;
    $(`#dropdownMenuLink3${u}`).addClass('show-pop');

  }
  holdDropDownPsycho(i ) {
    $(`#dropdownMenuLink3${i}`).addClass('show-pop');

  }


  closePsychomotor(psycho ) {
    $(`#dropdownMenuLink3${psycho}`).removeClass('show-pop');
    console.log(this.psychomotorForm.value);
    if (this.Psycomotor[psycho].name === this.kineticeName) {
     this.Psycomotor[psycho].value = this.psychoValue;
    }
    this.PyschomotorBehaviour = [
      {
        behaviourName: this.Psycomotor[0].name,
        grade: this.Psycomotor[0].value
      },
      {
        behaviourName: this.Psycomotor[1].name,
        grade: this.Psycomotor[1].value
      },
      {
        behaviourName: this.Psycomotor[2].name,
        grade: this.Psycomotor[2].value
      },
      {
        behaviourName: this.Psycomotor[3].name,
        grade: this.Psycomotor[3].value
      },
      {
        behaviourName: this.Psycomotor[4].name,
        grade: this.Psycomotor[4].value
      }
    ];
    console.log(this.PyschomotorBehaviour);
  }


  createResult() {
    const resultTypeAndValue = {
      Cognitive: this.CongitiveBehaviour,
      Feeling: this.AffectiveBehaviour,
      psychomotor: this.PyschomotorBehaviour
    };
    const result = {
      sessionId: this.sessions.id,
      termSequence: this.selectedTermId,
      classId: this.selectedClassId,
      studentId: this.selectedStudent.id,
      resultTypeAndValues: resultTypeAndValue
    };

    console.log(result);

    this.resultService.createStudentBehaviour(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log('behaviour', data.payload);
      }
    });

    const {comment} = this.teacherComment;

    const studentResult = {
      sessionId: this.sessions.id,
      termSequence: this.selectedTermId,
      classId: this.selectedClassId,
      studentId: this.selectedStudent.id,
      classTeacherComment: comment,
      classTeacherApprovalStatus: 1,
      headTeacherComment: '',
      adminApprovalStatus: 0,
      headTeacherApprovalStatus: 0

    };

    this.assessmentService.submitStudentResultForApproval(studentResult).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.teacherComment.comment = '';
        this.notifyService.publishMessages('Result submmmited successfully', 'success', 1);
      }
  }, error => {
    this.notifyService.publishMessages(error.payload, 'danger', 1);

  });
  }
}

