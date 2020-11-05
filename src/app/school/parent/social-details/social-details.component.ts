import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.css']
})
export class SocialDetailsComponent implements OnInit {
  basicDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.basicDetailsForm = this.fb.group({
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

}
