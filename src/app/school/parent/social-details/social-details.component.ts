import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParentComponent } from '../parent.component';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.css']
})
export class SocialDetailsComponent implements OnInit {
  socialDetailsForm: FormGroup;
  submitted = false;
  constructor(
              private fb: FormBuilder,
              private home: ParentComponent
              ) { }

  ngOnInit() {
    this.socialDetailsForm = this.fb.group({
      PhoneNumber: ['', Validators.required],
      SecondaryPhoneNumber: [''],
      EmailAddress: ['', [Validators.required, Validators.email]],
      SecondaryEmailAddress: ['' ],
      Address: ['', Validators.required],
      OfficeAddress: ['', Validators.required],

    });
  }

  close() {
    window.close();
  }

  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('parent-social-details', JSON.stringify(this.socialDetailsForm.value));
  }


}
