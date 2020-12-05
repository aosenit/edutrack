import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css']
})
export class GradingComponent implements OnInit {
extraCommentForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
this.extraCommentForm = this.fb.group({
  comment: ['', Validators.required]
});
  }

  submitComment() {
    console.log(this.extraCommentForm.value);
  }

  back() {
    window.history.back();
  }
}
