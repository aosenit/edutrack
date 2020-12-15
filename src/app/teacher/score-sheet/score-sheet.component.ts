import { Component, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import * as $ from 'jquery';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-score-sheet',
  templateUrl: './score-sheet.component.html',
  styleUrls: ['./score-sheet.component.css']
})
export class ScoreSheetComponent implements OnInit {
  classList: any;
  subjectList: any;
  className: any;
  studentList: any;
  assessmentList: any;
  addGradeForm: FormGroup;
  Subjectid: number;
  Classid: number;
  AssessmentName: string;
  AssesmentId: any;
  AssessmentScore: number;
  studentResults = [];
  assessmentAndScores = [];
  score: any;
  result: any;
  scoreObject = {};
  constructor(
    private subjectService: SubjectService,
    private classService: ClassService,
    private resultService: ResultService,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('#dropdownMenuLink').on('show.bs.dropdown', function () {
      $(`#dropdownMenuLink`).show();

    });

    this.getAllClasses();
    this.populateResult();

  }

  // drop(u) {
  //   // alert(u);
  //   // tslint:disable-next-line:only-arrow-functions
  //   $('.dropmenu').on('click', function()  {
  //     alert('asas');
  //   });
  // }

  // omo(u) {
  //   $(`#dropdownMenuLink${u}`).show();
  // }
  populateResult() {
    this.addGradeForm = this.fb.group({
      assessmentId: ['', Validators.required],
      score: ['', Validators.required]
    });
  }


  showPopMenu(u) {
    const pop = document.querySelector('.pop-menu + u');
    pop.classList.toggle('show-pop');

  }

  // getAssessmentName() {
  //   alert('hey');
  //   document.getElementById('dropdown').click();
  //   console.log('sasasasa');
  //   $('#dropdown').on('click', function() {
  //     $(this).parent().toggleClass('open');
  //   });

  // }
  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classList = data.payload;
        console.log(this.classList);
      }
    }
    );
  }

  getSubjects(id) {
    console.log(id);
    this.Classid = id;
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
        console.log(this.subjectList.subject);
      }
    }
    );

    this.classService.getClassById(id).subscribe((data: any) => {
      this.className = data.payload;
      console.log('sdsdsdsd', this.className.name);
    });

    // this.resultService.getStudentandAssement(1).subscribe((data: any) => {
    //   console.log('wahala', data);
    // });

  }

  generate() {
     this.resultService.generateReport(this.className.id, this.className.name).subscribe((data: any) => {
       console.log(data);
       if (data.hasErrors === false) {
         this.studentList = data.payload.assessments;
         this.assessmentList = data.payload.students;
        //  console.log(this.studentList);
        //  console.log('assessment', this.assessmentList);
       }
     });
  }


  generateExcel() {
    const n = this.resultService.generateExcel(this.className.id, this.className.name);
    console.log('sasas', n);
    // tslint:disable-next-line:no-unused-expression

  //   this.resultService.generateExcel(this.className.id, this.className.name).subscribe((data: any) => this.downloadFile(data)),
  //  // tslint:disable-next-line:no-unused-expression
  //   () => console.log('OK');
  }

  // downloadFile(data: Response) {
  //   const blob = new Blob([data] , { type: 'application/pdf'});
  //   const url = window.URL.createObjectURL(blob);
  //   window.open(url);
  // }

  getSubjectsId(id) {
    console.log(id);
    this.Subjectid = id;
  }

  // submitGrade(studentid) {
  //   const studentId = studentid;
  //   const classId = this.Classid;
  //   const subjectId = this.Subjectid;
  //   const { score } = this.addGradeForm.value;
  //   const assessmentId = this.AssesmentId;
  //   const assessmentName = this.AssessmentName;
  //   const result = {
  //     assessmentId,
  //     score,
  //     assessmentName
  //   };
  //   const assessmentAndScores = this.assessmentAndScores.push(result);
  //   const result2 = {
  //     studentId,
  //     assessmentAndScores : this.assessmentAndScores
  //   };
  //   const studentResults = this.studentResults.push(result2);
  //   const result3 = {
  //     subjectId,
  //     classId,
  //     studentResults : this.studentResults
  //   };
  //   console.log(result3);
  // }


  submitGrade(id, u) {
    // this.scoreObject['studentId'] = id;
    // this.scoreObject['caType'] = this.AssessmentName;
    // this.scoreObject['caScore'] = this.AssessmentScore;
    // this.scoreObject['scoreValue'] = this.addGradeForm.controls.score.value;
    // console.log(this.scoreObject);
    this.result = this.addGradeForm.value;
    $(`#dropdownMenuLink${u}`).toggleClass('show-pop');
  }

  getAssessmentName( id, u) {
    console.log(this.studentList[id].id);
    this.AssesmentId = this.studentList[id].id;
    this.AssessmentName = this.studentList[id].name;
    this.AssessmentScore = this.studentList[id].maxScore;
    $(`#dropdownMenuLink${u}`).addClass('show-pop');
    
  }
  
  omo(u) {
    $(`#dropdownMenuLink${u}`).addClass('show-pop');

  }

}
