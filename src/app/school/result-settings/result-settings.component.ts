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
    console.log(this.assessmentForm.value);
    const {name, maxScore} = this.assessmentForm.value;
    const sequenceNumber = this.sequenceCount++;
    const result = {
      name,
      maxScore,
      sequenceNumber
    };
    this.assessmentForm.reset();
    this.allAssessment.push(result);
    console.log('All assessments', this.allAssessment);
    document.getElementById('assessmentModal').click();
  }

  publishAssessment() {
    this.assessmentService.setUpAssessment(this.allAssessment).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.notifyService.publishMessages('Assessment setup successfully', 'success', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });

  }

  getAllAssessmentSetup() {
    this.allAssessment.pop();
    this.assessmentService.getAllAssessmentSetup().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
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
      console.log(this.gradeForm.value);
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
      // this.gradeForm.();
      this.grades.push(result);
      console.log(this.grades);
    
  }

  publishGrade() {
    this.gradeService.addGrade(this.grades).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.notifyService.publishMessages('Grade setup successfully', 'success', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  getAllGrade() {
    this.gradeService.getAllGrades().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        console.log(data);
        this.grades = data.payload;
      }
      // this.grades.forEach(element => {
      //   console.log(element.lowerBound);
      // });
    });
  }
}
