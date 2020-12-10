import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';

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
sequenceCount = 0;
allAssessment = [];
assessmentCount: number;
  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.assessmentForm = this.fb.group({
      name: ['', Validators.required],
      maxScore: ['', Validators.required],
    });
    this.getAllAssessmentSetup();
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
        this.assessmentCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });

  }
}
