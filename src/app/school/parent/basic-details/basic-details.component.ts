import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../parent.component';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {

  basicDetailsForm: FormGroup;
  toggleState = false;
  constructor(private home: ParentComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.basicDetailsForm = this.fb.group({
      title: ['', Validators.required],
      contactFirstName: ['', Validators.required],
      contactLastName: ['', Validators.required],
      contactOtherName: ['', Validators.required],
      sex: ['', Validators.required],
      occupation: ['', Validators.required],
      identification: ['', Validators.required],
      status: ['', Validators.required],
      identificationNumber: ['', Validators.required],
      profileImage: null

    });
  }

  nextStep() {
    this.home.stepper(2);
    sessionStorage.setItem('parent-basic-details', JSON.stringify(this.basicDetailsForm.value));
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }
}
