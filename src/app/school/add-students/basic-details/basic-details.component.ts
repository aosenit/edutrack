import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { countries } from '../../../../services/utils/country.json';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {
  countries: any = countries;
  states: any[];
  basicDetailsForm: FormGroup;
  parents: any;
  basicDetails: any;
  studentid: any;

  constructor(
    private home: AddStudentsComponent,
    private parentService: ParentsService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notifyService: NotificationsService) { }

  ngOnInit() {
    this.studentid = this.route.snapshot.params.id;
    this.createStudentData();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.createStudentData();
      } else {
        this.getProfileInformation();

      }
    });

    this.getAllParents();
    this.getActivetab();
  }

  createStudentData() {
    this.basicDetailsForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      OtherNames: [''],
      MothersMaidenName: ['', Validators.required],
      Sex: ['', Validators.required],
      DateOfBirth: ['', Validators.required],
      Religion: ['', Validators.required],
      Nationality: ['', Validators.required],
      parentId: ['', Validators.required],
      StateOfOrigin: ['', Validators.required],
      LocalGovt: [''],
      TransportRoute: ['']
    });
  }
  nextStep() {
    this.home.stepper(2);
    // tslint:disable-next-line:max-line-length
    const {FirstName, LastName, OtherNames, MothersMaidenName, Sex, DateOfBirth, Religion, Nationality, parentId, StateOfOrigin, LocalGovt, TransportRoute  } = this.basicDetailsForm.value;
    const result = {
      FirstName,
      LastName,
      OtherNames,
      MothersMaidenName,
      Sex,
      DateOfBirth,
      Religion,
      Nationality,
      // tslint:disable-next-line:radix
      ParentId: parseInt(parentId),
      StateOfOrigin,
      LocalGovt,
      TransportRoute

    };
    sessionStorage.setItem('student-basic-details', JSON.stringify(result));
  }

  getState(event) {
    for (const unit in countries) {
      if (event === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
      }
    }

  }

  getAllParents() {
    this.parentService.getAllParentsWithName().subscribe(
      (res: any) => {
       if (res.hasErrors === false) {
        this.parents = res.payload;
        console.log(this.parents);
       }
      }, error => {
        this.notifyService.publishMessages( error.errors, 'danger', 1);

      } );
  }

  getActivetab() {
    this.basicDetails = JSON.parse(sessionStorage.getItem('student-basic-details'));
    if (sessionStorage.getItem('student-basic-details') !== null) {
      console.log(`student  exists`);
      this.basicDetailsForm.patchValue({
        FirstName: this.basicDetails.FirstName,
        LastName: this.basicDetails.LastName,
        OtherNames: this.basicDetails.OtherNames,
        MothersMaidenName: this.basicDetails.MothersMaidenName,
        Sex: this.basicDetails.Sex,
        DateOfBirth: moment(this.basicDetails.DateOfBirth).format('YYYY-MM-DD'),
        Religion: this.basicDetails.Religion,
        Nationality: this.basicDetails.Nationality,
        parentId: this.basicDetails.ParentId,
        StateOfOrigin: this.basicDetails.StateOfOrigin,
        // LocalGovt: [''],
        TransportRoute: this.basicDetails.TransportRoute
      });
    } else {
      console.log(`student not found`);
    }
  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('all-student-info'));
    for (const unit in countries) {
      if (payload.nationality === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
        console.log(this.states)
      }
    }
    this.basicDetailsForm.patchValue({
      FirstName: payload.firstName,
      LastName: payload.lastName,
      OtherNames: payload.otherNames,
      MothersMaidenName: payload.mothersMaidenName,
      Sex: payload.sex,
      DateOfBirth: moment(payload.dateOfBirth).format('YYYY-MM-DD'),
      Religion: payload.religion,
      Nationality: payload.nationality,
      parentId: payload.parentId,
      StateOfOrigin: payload.stateOfOrigin,
      // LocalGovt: [''],
      TransportRoute: payload.transportRoute
    });

  }


}
