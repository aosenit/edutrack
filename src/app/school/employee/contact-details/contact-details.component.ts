import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  countries: any = countries;
  states: any[];
  @Output() sendChildName = new EventEmitter<string>();

  contactForm: FormGroup;
  contactDetails: any;

  constructor(private home: EmployeeComponent, private fb: FormBuilder,
              private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.sendChildName.emit('Contact Details');
    this.populateContactDetailsForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateContactDetailsForm();
      } else {
        this.getProfileInformation();

      }
    });
    this.getActiveTabDetails();

  }

populateContactDetailsForm() {
    this.contactForm = this.fb.group({
      PhoneNumber: ['', Validators.required],
      AltPhoneNumber: ['', Validators.required],
      EmailAddress: ['', Validators.required],
      AltEmailAddress: ['', Validators.required],
      Country: [''],
      Address: ['', Validators.required],
      State: ['', Validators.required],
      Town: ['', Validators.required]
    });
  }
  nextStep() {
    this.home.stepper(4);
    sessionStorage.setItem('employee-contact-details', JSON.stringify(this.contactForm.value));
  }

  getState(event) {
    for (const unit in countries) {
        if (event === countries[unit].country) {
          const state = countries[unit].states;
          this.states = state;
        }
      }
  }

  prevStep() {
    this.home.stepper(2);
    // this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    // this.currentStep.classList.remove('active');
  }

  getActiveTabDetails() {
    this.contactDetails = JSON.parse( sessionStorage.getItem('employee-contact-details'));

    if (sessionStorage.getItem('employee-contact-details') !== null) {
      // console.log(`School person exists`);
      this.contactForm.patchValue({
        PhoneNumber: this.contactDetails.PhoneNumber,
      AltPhoneNumber: this.contactDetails.AltPhoneNumber,
      EmailAddress: this.contactDetails.EmailAddress,
      AltEmailAddress: this.contactDetails.AltEmailAddress,
      Country: this.contactDetails.Country,
      Address: this.contactDetails.Address,
      State: this.contactDetails.State,
      Town: this.contactDetails.Town
      });
    } else {
    }
  }

  getProfileInformation() {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));
    this.contactForm.patchValue({
        PhoneNumber: payload.contactDetails.phoneNumber,
      AltPhoneNumber: payload.contactDetails.altPhoneNumber,
      EmailAddress: payload.contactDetails.emailAddress,
      AltEmailAddress: payload.contactDetails.altEmailAddress,
      Country: payload.contactDetails.country,
      Address: payload.contactDetails.address,
      State: payload.contactDetails.state,
      Town: payload.contactDetails.town
    });
  }


}
