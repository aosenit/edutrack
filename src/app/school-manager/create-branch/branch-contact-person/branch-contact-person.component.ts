import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateBranchComponent } from '../create-branch.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';


@Component({
  selector: 'app-branch-contact-person',
  templateUrl: './branch-contact-person.component.html',
  styleUrls: ['./branch-contact-person.component.css']
})
export class BranchContactPersonComponent implements OnInit {

  contactPersonForm: FormGroup;
  currentStep: any;
  step: any;
  id: any;

  contactPerson: any;
  adminDetails: any;
  formBtn = {
    type: 'create',
    text: 'Create Branch'
  };
  DocumentTypes: number[] = [];
  routeUrl: string;



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService: NotificationsService,
    private schoolServies: SchoolService,
    private home: CreateBranchComponent
              ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.id = this.route.snapshot.params.id;

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
    this.home.stepper(4);
    sessionStorage.setItem('contact-person', JSON.stringify(this.contactPersonForm.value));

  }

  prevStep() {
    this.home.stepper(2);
    this.currentStep = document.getElementById('step-' + `${2 + 1}`);
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
    this.contactPerson = JSON.parse( sessionStorage.getItem('contact-person'));

    if (sessionStorage.getItem('contact-person') !== null) {
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

  createSchool() {

    const profile = JSON.parse(sessionStorage.getItem('profile-info'));
    const details = JSON.parse(sessionStorage.getItem('school-details'));
    const finalstep = this.contactPersonForm.value;

    const isActive = true;
    const GroupId = this.adminDetails.SchGroupId;

    // const formData = new FormData();
    // this.DocumentTypes.forEach((item: any) => formData.append('DocumentTypes', item));

    const result = {...profile, ...details, ...finalstep, isActive, GroupId,  DocumentTypes: this.DocumentTypes};

    if (this.formBtn.type === 'create') {
      this.schoolServies.addSchool(result).subscribe( (data: any) => {
        if ( data.hasErrors === false ) {
            // console.log('school create successfully', data);
            this.notifyService.publishMessages(data.description, 'info', 1);
            sessionStorage.removeItem('profile-info');
            sessionStorage.removeItem('school-details');
            sessionStorage.removeItem('contact-person');
            this.router.navigateByUrl('/school-manager/branches');
        } else {
          // console.log(data);
          this.notifyService.publishMessages(data.errors, 'danger', 1);
        }
      }, error => {
        // console.log(error);
        this.notifyService.publishMessages(error, 'danger', 1);

      });
    } else {
      this.schoolServies.updateSchool(this.id, result).subscribe( (data: any) => {
        if ( data.hasErrors === false ) {
            // console.log('school edited successfully', data);
            this.notifyService.publishMessages(data.description, 'info', 1);
            sessionStorage.removeItem('profile-info');
            sessionStorage.removeItem('school-details');
            sessionStorage.removeItem('contact-person');
            if ( this.routeUrl === '/school-manager/create-school' ) {
              this.router.navigateByUrl('/school-manager/branches');
            } else {
              console.log('ADMIN');
              this.router.navigateByUrl('/admin/clients');
            }
        }
      }, error => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);

      });

  }
}


}
