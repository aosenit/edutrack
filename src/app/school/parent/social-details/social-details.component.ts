import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ParentComponent } from '../parent.component';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.css']
})
export class SocialDetailsComponent implements OnInit {
  socialDetailsForm: FormGroup;
  submitted = false;
  currentStep: any;
  step: any;
  socialDetails: any;
  parentId: any;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private home: ParentComponent
  ) { }

  ngOnInit() {
    this.parentId = this.route.snapshot.params.id;

    this.populateSocialDetailsForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateSocialDetailsForm();
      } else {
        this.getProfileInformation();
      }
    });
    this.getActiveTab();
  }

  populateSocialDetailsForm() {
    this.socialDetailsForm = this.fb.group({
      PhoneNumber: ['', [Validators.required, Validators.pattern('(0[7-9][0-1][0-9]{8})|(0[1-4][0-9]{7})+$')]],
      SecondaryPhoneNumber: ['', Validators.pattern('(0[7-9][0-1][0-9]{8})|(0[1-4][0-9]{7})+$')],
      EmailAddress: ['', [Validators.required, Validators.email]],
      SecondaryEmailAddress: ['', Validators.email],
      HomeAddress: ['', Validators.required],
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

  prevStep() {
    this.home.stepper(1);
    this.currentStep = document.getElementById('step-' + `${1 + 1}`);
    this.currentStep.classList.remove('active');


  }

  getActiveTab() {
    this.socialDetails = JSON.parse(sessionStorage.getItem('parent-social-details'));

    if (sessionStorage.getItem('parent-social-details') !== null) {
      // (`Social details exists`);
      this.socialDetailsForm.patchValue({
        PhoneNumber: this.socialDetails.PhoneNumber,
        SecondaryPhoneNumber: this.socialDetails.SecondaryPhoneNumber,
        EmailAddress: this.socialDetails.EmailAddress,
        SecondaryEmailAddress: this.socialDetails.SecondaryEmailAddress,
        HomeAddress: this.socialDetails.HomeAddress,
        OfficeAddress: this.socialDetails.OfficeAddress,
      });
    } else {
      // (`School details not found`);
    }
  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('all-parent-info'));
    // ('na the paylod', payload);
    this.socialDetailsForm.patchValue({
      PhoneNumber: payload.contactNumber,
        SecondaryPhoneNumber: payload.secondaryPhoneNumber,
        EmailAddress: payload.contactEmail,
        SecondaryEmailAddress: payload.secondaryEmailAddress,
        HomeAddress: payload.contactHomeAddress,
        OfficeAddress: payload.officeHomeAddress,
    });
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
  
  allowNumbersOnly2(e) {
    const ev = e || window.event;
    const charcode = ev.which ? ev.which : ev.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57) && charcode !== 46) {
      e.preventDefault();
      return false;
    }
    return true;
  }


}
