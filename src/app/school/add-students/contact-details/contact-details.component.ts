import { findReadVarNames } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  contactDetailsForm: FormGroup;

  constructor(private home: AddStudentsComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.contactDetailsForm = this.fb.group({
      contactPhoneNumber: ['', Validators.required],
      contactEmail: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  nextStep() {
    this.home.stepper(4);
    sessionStorage.setItem('contact-details', JSON.stringify(this.contactDetailsForm.value));
  }

}
