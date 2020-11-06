import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {

  basicDetailsForm: FormGroup;
  constructor(private home: AddStudentsComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.basicDetailsForm = this.fb.group({
      ContactFirstName: ['', Validators.required],
      ContactLastName: ['', Validators.required],
      ContactOtherName: ['', Validators.required],
      motherName: ['', Validators.required],
      sex: [''],
      dob: ['', Validators.required],
      profilePhoto: null,
      religion: ['', Validators.required],
      nationality: ['', Validators.required],
      parents: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      transportRoute: ['', Validators.required]
    });
  }

  nextStep() {
    this.home.stepper(2);
    sessionStorage.setItem('basic-details', JSON.stringify(this.basicDetailsForm.value));
  }

}
