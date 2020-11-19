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
      ContactPhone: ['', Validators.required],
      ContactEmail: ['', Validators.required],
      ContactCountry: ['', Validators.required],
      ContactAddress: ['', Validators.required],
      ContactTown: ['', Validators.required],
      ContactState: ['', Validators.required],
    });
  }

  nextStep() {
    this.home.stepper(4);
    sessionStorage.setItem('contact-details', JSON.stringify(this.contactDetailsForm.value));
  }

}
