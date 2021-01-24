import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../parent.component';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {

  basicDetailsForm: FormGroup;
  toggleState = false;
  parentBasicDetail: any;
  parentId: any;

  constructor(
    private home: ParentComponent,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private parentService: ParentsService ) { }

  ngOnInit() {
    this.parentId = this.route.snapshot.params.id;

    this.getParentByID();
    this.populateParentBasicDetails();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateParentBasicDetails();
      } else {
        this.getProfileInformation();

      }
    });
    this.getActiveTab();

  }

  populateParentBasicDetails() {
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

  getActiveTab() {
    this.parentBasicDetail = JSON.parse(sessionStorage.getItem('parent-basic-details'));
    if (sessionStorage.getItem('parent-basic-details') !== null) {
      console.log(`Parent Basic details exists`);
      this.basicDetailsForm.patchValue({
        Title: this.parentBasicDetail.Title,
        FirstName: this.parentBasicDetail.FirstName,
        LastName: this.parentBasicDetail.LastName,
        OtherName: this.parentBasicDetail.OtherName,
        Sex: this.parentBasicDetail.Sex,
        Occupation: this.parentBasicDetail.Occupation,
        ModeOfIdentification: this.parentBasicDetail.ModeOfIdentification,
        Status: this.parentBasicDetail.Status,
        IdentificationNumber: this.parentBasicDetail.IdentificationNumber,
      });
    } else {
      console.log(`Parent Basic details not found`);
    }
  }

  getParentByID() {
    this.parentService.getParentById(this.parentId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        sessionStorage.setItem('all-parent-info', JSON.stringify(data.payload));
      }
    });
  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('all-parent-info'));
    this.basicDetailsForm.patchValue({
      Title: payload.title,
      FirstName: payload.firstName,
      LastName: payload.lastName,
      OtherName: payload.otherName,
      Sex: payload.sex,
      Occupation: payload.occupation,
      ModeOfIdentification: payload.modeOfIdentification,
      Status: payload.status,
      IdentificationNumber: payload.identificationNumber,
    });
  }

}
