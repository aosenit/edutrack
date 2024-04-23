import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { GradeService } from 'src/services/data/grade/grade.service';

@Component({
  selector: 'app-result-settings',
  templateUrl: './result-settings.component.html',
  styleUrls: ['./result-settings.component.css']
})
export class ResultSettingsComponent implements OnInit {
grade = true;
assessment = false;
domain = false;
assessmentForm: FormGroup;
gradeForm: FormGroup;
sequenceCount = 0;
allAssessment = [];
grades = [];
errorLabel = null;
assessments: any;
assessmentCount: number;
toggleState = false;
  currentGradeId: any;
  selectedSequence: any;
  selectedAssessmentIndex: any;
  isEditingAssessment = false;

  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService,
    private gradeService: GradeService
  ) { }

  ngOnInit() {
    this.assessmentForm = this.fb.group({
      name: ['', Validators.required],
      maxScore: ['', Validators.required],
      isExam: [false],

    });
    this.getAllAssessmentSetup();
    this.populateGradeForm();
    this.getAllGrade();
  }

  populateGradeForm() {
    this.gradeForm = this.fb.group({
      grade: ['', Validators.required],
      interpretation: ['', Validators.required],
      lowerBound: ['', Validators.required],
      upperBound: ['', Validators.required],
      isActive: [false]
    });
  }

  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus) {
        case 'grade':
          this.grade = true;
          this.assessment = false;
          this.domain = false;
          break;

        case 'assessment':
          this.grade = false;
          this.assessment = true;
          this.domain = false;
          break;

        case 'domain':
          this.grade = false;
          this.assessment = false;
          this.domain = true;
          break;

        default:
          this.grade = true;
    }
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }

  addAssessment() {
    const {name, maxScore, isExam} = this.assessmentForm.value;
    const sequenceNumber = this.sequenceCount++;
    const result = {
      name,
      maxScore,
      isExam,
      sequenceNumber
    };
    this.assessmentForm.reset();
    this.allAssessment.push(result);
    // ('All assessments', this.allAssessment);
    const countArray = [];
    // tslint:disable-next-line:forin
    for (const unit in this.assessments) {
      countArray.push(this.assessments[unit].maxScore);
      this.assessmentCount = countArray.reduce((a, b) => a + b, 0);
    }
    document.getElementById('assessmentModal').click();
    this.assessmentForm.setValue({
      isExam : false,
      name: '',
      maxScore: ''
    });
    // (this.assessmentForm.value);
  }

  publishAssessment() {
    this.assessmentService.setUpAssessment(this.allAssessment).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data);
        this.notifyService.publishMessages('Assessment setup successfully', 'success', 1);
        location.reload();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });

  }

  publishAssessmentUpdates() {
    console.log(this.allAssessment);
    const payload = this.allAssessment.map((x: any, i) => {
      return {
            id: x.id,
            sequenceNumber: x.sequenceNumber,
            name: x.name,
            maxScore: x.maxScore,
            isExam: x.isExam,
            tenantId: x.tenantId ? x.tenantId : this.allAssessment[1].tenantId
      };
    });
    console.log(payload);

    this.assessmentService.updateAssessment(this.allAssessment).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data);
        this.notifyService.publishMessages('Assessment setup successfully', 'success', 1);
        location.reload();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
    }



getAllAssessmentSetup() {
    this.allAssessment.pop();
    this.assessmentService.getAllAssessmentSetup().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.allAssessment = data.payload;
        this.assessments = data.payload;
        this.assessmentCount = data.totalCount;
        const countArray = [];
        // tslint:disable-next-line:forin
        for (const unit in this.assessments) {
          countArray.push(this.assessments[unit].maxScore);
          this.assessmentCount = countArray.reduce((a, b) => a + b, 0);
        }
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });

  }

submitGrade() {
      // (this.gradeForm.value);
      const sequenceNumber = this.sequenceCount++;
      const {grade, interpretation, lowerBound, upperBound, isActive} = this.gradeForm.value;
      if (lowerBound > upperBound) {
        // alert('ko possible na');
        this.errorLabel = 'Lower bound must be less than upper bound';
        return false;
      }
      const result = {
        grade,
        interpretation,
        lowerBound,
        upperBound,
        isActive,
        sequenceNumber
      };
      document.getElementById('myGradeModal').click();
      this.grades.push(result);
      // (this.grades);
      this.gradeForm.reset();

  }

publishGrade() {
    this.gradeService.addGrade(this.grades).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.notifyService.publishMessages('Grade setup successfully', 'success', 1);
        this.getAllGrade();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

getAllGrade() {
    this.gradeService.getAllGrades().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        // (data);
        this.grades = data.payload;
      }
      // this.grades.forEach(element => {
      //   // (element.lowerBound);
      // });
    });
  }

edit(data) {
    console.log(data);
    this.currentGradeId = data.id;
    this.selectedSequence = data.sequence;
    this.gradeForm.patchValue({
      grade: data.grade,
      interpretation: data.interpretation,
      lowerBound: data.lowerBound,
      upperBound: data.upperBound,
      isActive: data.isActive
    });
    // document.getElementById('exampleModalCenterGrade22').click();
  }

updateGrade() {
    this.gradeService.updateGradeSetup({id: this.currentGradeId, sequence: this.selectedSequence, ...this.gradeForm.value}).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        document.getElementById('editGradeModal').click();

        this.notifyService.publishMessages('Grade updated successfully', 'success', 1);

        this.getAllGrade();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

delete(grade) {
    this.gradeService.deleteGradeSetup(grade.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);

        this.notifyService.publishMessages(data.payload, 'success', 1);

        this.getAllGrade();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });

  }

  editAssessment(data, index) {
    this.selectedAssessmentIndex = index;
    this.assessmentForm.setValue({
      isExam : data.isExam,
      name: data.name ,
      maxScore: data.maxScore
    });
    this.isEditingAssessment = true;
  }

updateAssessment() {
    const {name, maxScore, isExam} = this.assessmentForm.value;
    this.allAssessment[this.selectedAssessmentIndex].name = name;
    this.allAssessment[this.selectedAssessmentIndex].maxScore = maxScore;
    // this.allAssessment[this.selectedAssessmentIndex].sequence = this.allAssessment[this.allAssessment.length - 1].sequence + 1;
    // console.log(this.allAssessment);
    const countArray = [];
    // tslint:disable-next-line:forin
    for (const unit in this.assessments) {
      countArray.push(this.assessments[unit].maxScore);
      this.assessmentCount = countArray.reduce((a, b) => a + b, 0);
    }
    if (this.assessmentCount > 100) {
      this.notifyService.publishMessages('Percentage cant be more than 100', 'info', 0);
    } else {
      document.getElementById('assessmentModalEdit').click();
      this.assessmentForm.setValue({
        isExam : false,
        name: '',
        maxScore: ''
      });
    }
  }
}
