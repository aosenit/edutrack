import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.component.html',
  styleUrls: ['./next-of-kin.component.css']
})
export class NextOfKinComponent implements OnInit {
  countries: any = countries;
  states: any[];
  nextOfKinForm: FormGroup;
  nexKinDetails: any;

  @Output() sendChildName = new EventEmitter<string>();
  constructor(
    private home: EmployeeComponent,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sendChildName.emit('Next Of Kin Information');
    this.populateNextofKinForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateNextofKinForm();
      } else {
        this.getProfileInformation();

      }
    });
    this.getAActiveTab();
  }

  populateNextofKinForm() {
    this.nextOfKinForm = this.fb.group({
      NextKinFirstName: ['', Validators.required],
      NextKinLastName: ['', Validators.required],
      NextKinOtherName: ['', Validators.required],
      NextKinRelationship: ['', Validators.required],
      NextKinOccupation: [''],
      NextKinPhone: ['', Validators.required],
      NextKinCountry: ['', Validators.required],
      NextKinAddress: ['', Validators.required],
      NextKinState: ['', Validators.required],
      NextKinTown: ['', Validators.required]
    });
  }


  nextStep() {
    this.home.stepper(5);
    sessionStorage.setItem('employee-next-kin', JSON.stringify(this.nextOfKinForm.value));
  }

  prevStep() {
    this.home.stepper(3);
    // this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    // this.currentStep.classList.remove('active');
  }

  getState(event) {
    for (const unit in countries) {
      if (event === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
      }
    }

  }

  getAActiveTab() {
    this.nexKinDetails = JSON.parse(sessionStorage.getItem('employee-next-kin'));

    if (sessionStorage.getItem('employee-next-kin') !== null) {
      // console.log(`School person exists`);
      this.nextOfKinForm.patchValue({
        NextKinFirstName: this.nexKinDetails.NextKinFirstName,
        NextKinLastName: this.nexKinDetails.NextKinLastName,
        NextKinOtherName: this.nexKinDetails.NextKinOtherName,
        NextKinRelationship: this.nexKinDetails.NextKinRelationship,
        NextKinOccupation: this.nexKinDetails.NextKinOccupation,
        NextKinPhone: this.nexKinDetails.NextKinPhone,
        NextKinCountry: this.nexKinDetails.NextKinCountry,
        NextKinAddress: this.nexKinDetails.NextKinAddress,
        NextKinState: this.nexKinDetails.NextKinState,
        NextKinTown: this.nexKinDetails.NextKinTown
      });
    } else {
    }

  }

  getProfileInformation() {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));
    this.nextOfKinForm.patchValue({
      NextKinFirstName: payload.nextOfKin.nextKinFirstName,
      NextKinLastName: payload.nextOfKin.nextKinLastName,
      NextKinOtherName: payload.nextOfKin.nextKinOtherName,
      NextKinRelationship: payload.nextOfKin.nextKinRelationship,
      NextKinOccupation: payload.nextOfKin.nextKinOccupation,
      NextKinPhone: payload.nextOfKin.nextKinPhone,
      NextKinCountry: payload.nextOfKin.nextKinCountry,
      NextKinAddress: payload.nextOfKin.nextKinAddress,
      NextKinState: payload.nextOfKin.nextKinState,
      NextKinTown: payload.nextOfKin.nextKinTown
    });
  }
}
