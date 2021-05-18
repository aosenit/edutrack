import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { countries } from '../../../../services/utils/country.json';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  @Output() sendChildName = new EventEmitter<string>();
  countries: any = countries;
  states: any[];
  personalDetails: any;

  iconname = null;
  personalDetailsForm: FormGroup;
  toggleState: any;
  constructor(
    private home: EmployeeComponent,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.sendChildName.emit('Personal Information');
    this.populatePersonalDataForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populatePersonalDataForm();
      } else {
        this.getProfileInformation();

      }
    });
    this.getActiveTabDetails();
  }


  populatePersonalDataForm() {
    this.personalDetailsForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      OtherNames: [''],
      DateOfBirth: ['', Validators.required],
      Sex: ['', Validators.required],
      Nationality: ['', Validators.required],
      MaritalStatus: ['', Validators.required],
      BloodGroup: ['', Validators.required],
      Religion: ['', Validators.required],
      StateOfOrigin: ['', Validators.required],
      LocalGovernment: [''],
      IsActive: [false]
    });
  }



  nextStep() {
    this.home.stepper(2);
    sessionStorage.setItem('employee-personal-data', JSON.stringify(this.personalDetailsForm.value));
  }


  // handleIconUpload(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log('file', file);
  //     this.iconname = file.name;
  //     // this.profileForm.get('icon').setValue(file);
  //     // this.iconname = this.icon.name;
  //   }
  // }


  submitPersonalDetails() {
    console.log(this.personalDetailsForm.value);
    sessionStorage.setItem('employee-personal-data', JSON.stringify(this.personalDetailsForm.value));
  }

  getState(event) {
    for (const unit in countries) {
        if (event === countries[unit].country) {
          const state = countries[unit].states;
          this.states = state;
        }
      }

    }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }

  getActiveTabDetails() {

    this.personalDetails = JSON.parse( sessionStorage.getItem('employee-personal-data'));

    if (sessionStorage.getItem('employee-personal-data') !== null) {
      console.log(`School person exists`);
      this.personalDetailsForm.patchValue({
        FirstName: this.personalDetails.FirstName,
      LastName: this.personalDetails.LastName,
      OtherNames: this.personalDetails.OtherNames,
      DateOfBirth: moment(this.personalDetails.dateOfBirth).format('YYYY-MM-DD'),
      Sex: this.personalDetails.Sex,
      Nationality: this.personalDetails.Nationality,
      MaritalStatus: this.personalDetails.MaritalStatus,
      BloodGroup: this.personalDetails.BloodGroup,
      Religion: this.personalDetails.Religion,
      StateOfOrigin: this.personalDetails.StateOfOrigin,
      LocalGovernment: [''],
      IsActive: this.personalDetails.IsActive
      });
    } else {
      console.log(`School person not found`);
    }

  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('all-employee-info'));
    for (const unit in countries) {
      if (payload.nationality === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
      }
    }
    this.personalDetailsForm.patchValue({
      FirstName: payload.firstName,
    LastName: payload.lastName,
    OtherNames: payload.otherNames,
    DateOfBirth: moment(payload.dateOfBirth).format('YYYY-MM-DD'),
    Sex: payload.sex,
    Nationality: payload.nationality,
    MaritalStatus: payload.maritalStatus,
    BloodGroup: payload.bloodGroup,
    Religion: payload.religion,
    StateOfOrigin: payload.stateOfOrigin,
    LocalGovernment: [''],
    IsActive: payload.isActive
    });
  }

}
