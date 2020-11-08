import { Component, OnInit } from '@angular/core';
import { CreateClientComponent } from '../create-client.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SchoolService } from 'src/services/data/school/school.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  profileForm: FormGroup;
  profileInfo: any;
  id: any;
  constructor(
     private home: CreateClientComponent,
     private route: ActivatedRoute,
     private router: Router,
     private fb: FormBuilder,
     private schoolServices: SchoolService,
    ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log('page id', this.id);

    this.createProfileForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.createProfileForm();
      } else {
        this.getProfileInformation();
      }
    });
  }

  nextStep() {
    this.home.stepper(2);
    // const formData = this.assignFormDataValues(this.profileForm);
    sessionStorage.setItem('profile-info', JSON.stringify(this.profileForm.value));
  }

  createProfileForm() {
    this.profileForm = this.fb.group({

      Name : ['', Validators.required],
      DomainName : ['', Validators.required],
      WebsiteAddress: ['', Validators.required],

    });
  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('client-info'));
    this.populateEditProfileForm(payload);
  }

  populateEditProfileForm(payload: any) {
    this.profileForm = this.fb.group({
      Name: payload.name,
      DomainName: payload.domainName,
      WebsiteAddress: payload.websiteAddress
    });
  }

  // assignFormDataValues(form: FormGroup) {
  //   const formData = new FormData();
  //   Object.keys(form.controls).forEach(key => {
  //     formData.append(key, form.get(key).value);
  //   });
  //   return formData;
  // }

  back() {
    window.history.back();
  }
}
