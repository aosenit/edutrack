import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
@Component({
  selector: 'app-medical-details',
  templateUrl: './medical-details.component.html',
  styleUrls: ['./medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  medicalForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.medicalForm = this.fb.group({
      bloodGroup: ['', Validators.required],
      genotype: ['', Validators.required],
      disability: ['', Validators.required],
      allergies: ['', Validators.required],
      immunization: ['', Validators.required],
      age: ['', Validators.required],
      note: ['', Validators.required],
      date: ['', Validators.required],
      vaccine: ['', Validators.required]
    });
  }

  createStudent() {
    const basicDetials = JSON.parse(sessionStorage.getItem('basic-details')) ;
    const contactDetails = JSON.parse(sessionStorage.getItem('contact-details')) ;
    const socialDetails = JSON.parse(sessionStorage.getItem('social-details')) ;
    const medicalDetails = this.medicalForm.value;

    const result = { ...basicDetials, ...contactDetails, ...socialDetails, ...medicalDetails};
    console.log('sasasa', result);
  }

}
