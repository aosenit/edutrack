import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../parent.component';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {

  basicDetailsForm: FormGroup;
  toggleState = false;

  constructor(private home: ParentComponent, private fb: FormBuilder, private location:Location) { }

  ngOnInit() {
    this.basicDetailsForm = this.fb.group({
      Title: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      OtherName: ['', Validators.required],
      Sex: ['', Validators.required],
      Occupation: ['', Validators.required],
      ModeOfIdentification: ['', Validators.required],
      Status: ['', Validators.required],
      IdentificationNumber: ['', Validators.required],

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
