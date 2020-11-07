import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.css']
})
export class SocialDetailsComponent implements OnInit {
  socialDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.socialDetailsForm = this.fb.group({
      myPhone: ['', Validators.required],
      altPhone: ['', Validators.required],
      contactEmail: ['', Validators.required],
      contactAltEmail: ['', Validators.required],
      address: ['', Validators.required],
      officeAddress: ['', Validators.required],

    });
  }

  close() {
    window.close();
  }

  createParent() {
    const basic = JSON.parse(sessionStorage.getItem('parent-basic-details'));
    const social = this.socialDetailsForm.value;

    const result = {...basic, ...social};

    console.log(result);
  }

}
