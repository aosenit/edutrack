import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css']
})
export class GradingComponent implements OnInit {
  extraCommentForm: FormGroup;
  scoreForm: FormGroup;
  id: any;
  hideSide = false;
  gradeAssignment = true;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private assignmentservice: AssignmentService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.extraCommentForm = this.fb.group({
      comment: ['', Validators.required]
    });
    this.scoreForm = this.fb.group({
      score: ['', Validators.required]
    });
    this.getAssignmentPreview();
  }

  submitComment() {
    // tslint:disable-next-line:radix
    const assignmentAnswerId = parseInt(this.id);
    const { comment } = this.extraCommentForm.value;
    const result = {
      assignmentAnswerId,
      comment
    };
    console.log(result);
    this.assignmentservice.updateComment(result).subscribe((data: any) => {
      console.log(data);
      if (data.hasErrors === false) {
        console.log(data);
      }
    });

  }
  
  submitScore() {
    // tslint:disable-next-line:radix
    const assignmentAnswerId = parseInt(this.id);
    const { score } = this.scoreForm.value;
    const result = {
      assignmentAnswerId,
      score
    };
    this.assignmentservice.updateScore(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.notifyService.publishMessages('score submitted successfully', 'success', 1);

      }
    });
  }

  getAssignmentPreview() {
    const currentpath = this.route.snapshot.url[0].path; // get current path to know which endpoint to use
    console.log(currentpath);
    if (currentpath === 'preview-assignment') {
      this.hideSide = true;
      this.gradeAssignment = false;
    }
  }

  back() {
    window.history.back();
  }
}
