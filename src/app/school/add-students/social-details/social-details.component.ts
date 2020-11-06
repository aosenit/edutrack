import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddStudentsComponent } from '../add-students.component';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.css']
})
export class SocialDetailsComponent implements OnInit {
  socialDetailsForm: FormGroup;
  constructor(private home: AddStudentsComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.socialDetailsForm = this.fb.group({
      entryType: ['', Validators.required],
      admissionDate: ['', Validators.required],
      level: ['', Validators.required],
      studentClass: ['', Validators.required],
      studentType: ['', Validators.required],


    });
  }

  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('social-details', JSON.stringify(this.socialDetailsForm.value));
  }

}
