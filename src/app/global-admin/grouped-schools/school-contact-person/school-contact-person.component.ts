import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { GroupedSchoolsComponent } from '../grouped-schools.component';

@Component({
  selector: 'app-school-contact-person',
  templateUrl: './school-contact-person.component.html',
  styleUrls: ['./school-contact-person.component.css']
})
export class SchoolContactPersonComponent implements OnInit {

  contactPersonForm: FormGroup;
  currentStep: any;
  step: any;
  contactPerson: any;

  constructor(
    private fb: FormBuilder,
    private home: GroupedSchoolsComponent,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.populateContactPerson();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateContactPerson();
      } else {
        this.getProfileInformation();
      }
    });

    this.getAActiveTab();
  }

  populateContactPerson() {
    this.contactPersonForm = this.fb.group({
      ContactFirstName : ['', Validators.required],
      ContactLastName: ['', Validators.required],
      ContactPhoneNo: ['', [Validators.required, Validators.minLength(11), Validators.pattern('^[0-9]{0,11}$')]],
      ContactEmail: ['', [Validators.email, Validators.required]]
    });
  }


  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('grouped-contact-person', JSON.stringify(this.contactPersonForm.value));

  }

  prevStep() {
    this.home.stepper(1);
    this.currentStep = document.getElementById('step-' + `${1 + 1}`);
    this.currentStep.classList.remove('active');
  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('client-info'));
    this.contactPersonForm.patchValue({
          ContactFirstName: payload.contactFirstName,
          ContactLastName: payload.contactLastName,
          ContactPhoneNo: payload.contactPhone,
          ContactEmail: payload.contactEmail
        });
  }


  getAActiveTab() {
    this.contactPerson = JSON.parse( sessionStorage.getItem('grouped-contact-person'));

    if (sessionStorage.getItem('grouped-contact-person') !== null) {
      // // (`School person exists`);
      this.contactPersonForm.patchValue({
        ContactFirstName: this.contactPerson.ContactFirstName,
        ContactLastName: this.contactPerson.ContactLastName,
        ContactPhoneNo: this.contactPerson.ContactPhoneNo,
        ContactEmail: this.contactPerson.ContactEmail
      });
    } else {
    }

  }

  allowNumbersOnly(e) {
    const ev = e || window.event;
    const charcode = ev.which ? ev.which : ev.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57) && charcode !== 46) {
      e.preventDefault();
      return false;
    }
    return true;
  }

}
