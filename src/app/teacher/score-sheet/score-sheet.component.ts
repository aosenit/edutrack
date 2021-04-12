import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';

@Component({
  selector: 'app-score-sheet',
  templateUrl: './score-sheet.component.html',
  styleUrls: ['./score-sheet.component.css']
})
export class ScoreSheetComponent implements OnInit {
  noClass = true;
  displayClass = false;
  classList: any;
  subjectList: any;
  className: any;
  studentList: any;
  assessmentList: any;
  newList: any;
  addGradeForm: FormGroup;
  Subjectid: any;
  Classid: any;
  AssessmentName: string;
  AssesmentId: any;
  AssessmentSequence: any;
  AssessmentScore: number;
  studentResults = [];
  assessmentAndScores = [];
  score: any;
  result: any;
  fileString: any;
  scoreObject = {};
  bulkUpload: FormGroup;
  filename = null;
  scoreResult = {};
  cummulativeScore: any;
  omo: any;
  gradeIntepretation: any;
  studentGrade: any;
  gradeSetup: any;
  hideBtn = true;

  constructor(
    private subjectService: SubjectService,
    private classService: ClassService,
    private resultService: ResultService,
    private fb: FormBuilder,
    private notifyService: NotificationsService,
    private assessmentService: AssessmentService,
    private sanitizer: DomSanitizer


  ) { }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('#dropdownMenuLink').on('show.bs.dropdown', function() {
      $(`#dropdownMenuLink`).show();

    });

    this.getClassAndSubjectForTeacher();
    this.generateGradeSetup();
    this.populateResult();
    this.populateBulkUpload();

  }


  populateResult() {
    this.addGradeForm = this.fb.group({
      assessmentId: ['', Validators.required],
      score: ['', Validators.required]
    });
  }

  populateBulkUpload() {
    this.bulkUpload = this.fb.group({
      bulkFile: []
    });
  }


  showPopMenu(u) {
    const pop = document.querySelector('.pop-menu + u');
    pop.classList.toggle('show-pop');

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

    console.log('class id ', id);
    this.Classid = id;
    sessionStorage.setItem('class-id', this.Classid);
    this.classService.getSubjectForClass(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
        // console.log(this.subjectList.subject);
      }
    }
    );

    this.classService.getClassById(id).subscribe((data: any) => {
      this.className = data.payload;
      console.log('Class Name', this.className.name);
    });

    // this.resultService.getStudentandAssement(1).subscribe((data: any) => {
    //   console.log('wahala', data);
    // });

  }

  getSubjectsId(id) {
    console.log('Subject ID here', id);
    this.Subjectid = id;
    this.noClass = false;
    this.displayClass = true;
  }

  generate() {
    this.resultService.generateReport(this.className.id, this.className.name).subscribe((data: any) => {
      console.log(data);
      if (data.hasErrors === false) {
        this.studentList = data.payload.students;
        this.assessmentList = data.payload.assessments;
        const newList = this.studentList;
        // tslint:disable-next-line:forin
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < newList.length; i++) {
          // console.log(newList[i]);
          newList[i].assessments = this.assessmentList;
          this.newList = newList;
          // console.log(this.newList);


        }
        //  console.log('assessment', this.assessmentList);
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }


  generateExcel() {


    this.resultService.generateExcel(this.className.id, this.className.name).subscribe((data: any) => {
      console.log(data);
      if (data.hasErrors === false) {
        this.fileString = data.payload;
        this.convertBase64ToExcel();
      }
    });
  }


  convertBase64ToExcel() {

    const contentType = 'application/vnd.ms-excel';
    const blob1 = this.b64toBlob(this.fileString, contentType, 512);
    const blobUrl1 = URL.createObjectURL(blob1);

    window.open(blobUrl1);

  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || 'application/vnd.ms-excel';
    sliceSize = sliceSize || 512;

    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }


  handleBulkUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.filename = file.name;
      this.bulkUpload.get('bulkFile').setValue(file);
      // this.DocumentTypes.push(0);
    }
  }


  UploadBulkFile() {
    const { bulkFile } = this.bulkUpload.value;
    const ExcelFile = bulkFile;
    const schoolClassId = this.Classid;
    const subjectId = this.Subjectid;
    // tslint:disable-next-line:radix
    const SchoolClassId = parseInt(schoolClassId);
    // tslint:disable-next-line:radix
    const SubjectId = parseInt(subjectId);
    const result = {
      SchoolClassId,
      SubjectId,
      ExcelFile
    };

    console.log(result);

    this.resultService.UploadExcelResult(result).subscribe((data: any) => {
      console.log('bulk file', data);
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Result uploaded successfully', 'info', 1);
        document.getElementById('myModelClose').click();
        location.reload();
        // this.getAllSchools();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });


  }


  submitGrade(studentId, u) {
    // console.log('u', u);
    // console.log(studentId);
    this.checkTableCellStatus();

    const check = this.newList[u];
    // console.log(check);
    const { assessmentId, score } = this.addGradeForm.value;
    // console.log('assessmentId', assessmentId);
    // console.log('assessment score', score);
    // console.log('checkId', check.id);
    // tslint:disable-next-line:triple-equals
    if (check.id == studentId  && score > this.AssessmentScore) {
      this.notifyService.publishMessages('Score cannot be greater than max score', 'danger', 1);
      // console.log('ikoja aye');
      return;
    }

    if (this.scoreResult[studentId]) {
      this.scoreResult[studentId][this.AssessmentName] = {
        assesmentId: assessmentId,
        Score: score,
      };
    } else {
      this.scoreResult[studentId] = {
        [this.AssessmentName]: {
          assesmentId: assessmentId,
          Score: score,
        }
      };
    }

    const prevCumulative = this.scoreResult[studentId].cummulative || 0;
    this.scoreResult[studentId].cummulative = Number(prevCumulative) + Number(score);
    // this.scoreResult[studentId].studentGrade = this.studentGrade;
    // this.scoreResult[studentId].gradeIntepretation = this.gradeIntepretation;
    this.scoreObject = this.scoreResult;
    if (this.scoreResult[studentId].cummulative > 100) {
      alert('Cummulative score can exceed 100');
      this.scoreResult[studentId].cummulative = Number(prevCumulative) - Number(score);
    }
    console.log(this.scoreResult);

    const keyValue = (input) => Object.entries(input).forEach(([key, value]) => {
      const hold: any = value;
      // console.log(hold);
      if (this.scoreResult[studentId].cummulative >= hold.lowerBound) {
        this.scoreResult[studentId].gradeIntepretation = hold.interpretation;
        this.scoreResult[studentId].studentGrade = hold.grade;
        // tslint:disable-next-line:no-string-literal
        console.log(key['interpretation'].interpretation);
      } else {
        return;
      }

    });
    $(`#dropdownMenuLink${u}`).toggleClass('show-pop');
    keyValue(this.gradeSetup);
    // this.omo = this.scoreResult[studentId];
    const arr = [];

    // this.displayStudentGradeInterpretation(studentId);

  }


  submitResults() {
    const submit = () => {
      return Object.keys(this.scoreResult).map((value) => {
        return {
          // tslint:disable-next-line:radix
          studentId: parseInt(value),
          // tslint:disable-next-line:max-line-length
          assessmentAndScores: Object.keys(this.scoreResult[value]).filter((id) => id !== 'cummulative' &&  id !== 'gradeIntepretation' && id !== 'studentGrade').map((id) => ({
            // tslint:disable-next-line:radix
            assessmentId: parseInt(this.scoreResult[value][id].assesmentId),
            assessmentName: id,
            score: this.scoreResult[value][id].Score,
          })),
        };
      });
    };
    // tslint:disable-next-line:radix
    const classId = parseInt(this.Classid);
    // tslint:disable-next-line:radix
    const subjectId = parseInt(this.Subjectid);
    const result = {
      subjectId,
      classId,
      studentResults: submit()
    };

    this.resultService.UploadAssessmentSetup(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Result successfully published', 'success', 1);
        console.log(data);
        location.reload();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getAssessmentName(event, u) {
    this.AssesmentId = this.assessmentList[event].id;
    this.AssessmentName = this.assessmentList[event].name;
    // console.log(this.AssessmentName);
    this.AssessmentSequence = this.assessmentList[event].sequenceNumber;
    this.AssessmentScore = this.assessmentList[event].maxScore;
    // console.log('assessment score', this.AssessmentScore)
    $(`#dropdownMenuLink${u}`).addClass('show-pop');

  }

  holdDropDown(u) {
    $(`#dropdownMenuLink${u}`).addClass('show-pop');

  }

  saveStudentDetails(u) {
    console.log(this.studentList[u]);
    sessionStorage.setItem('student-details', JSON.stringify(this.studentList[u]));
  }

  generateGradeSetup() {
    this.assessmentService.getAllGradeSetupForSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log('All school grade', data.payload);
        this.gradeSetup = data.payload;
      }
    });
  }


  // displayStudentGradeInterpretation(studentId) {
  //   const keyValue = (input) => Object.entries(input).forEach(([key , value]) => {
  //     const hold: any = value;
  //     // console.log('na me hold dem', value);
  //     if ( this.scoreResult[studentId].cummulative >= hold.lowerBound) {
  //       console.log('matching key', key);
  //       // this.interpretation = key['interpretation'].interpretation;
  //       this.studentGrade = hold.grade;
  //       this.gradeIntepretation = hold.interpretation;
  //       // tslint:disable-next-line:no-string-literal
  //       // console.log(key['interpretation'].interpretation);
  //      }

  //   });
  //   keyValue(this.gradeSetup);
  // }

  checkTableCellStatus() {
    const cellCheck = document.querySelectorAll('.scores');

    cellCheck.forEach((element: any) => {
      // console.log(element.innerText);
      if (element.innerText === '') {
        this.hideBtn = false;
      } else {
        this.hideBtn = true;
      }
    });
  }
}
