import { Component, OnInit } from '@angular/core';
import { CreateClientComponent } from '../create-client.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { countries } from '../../../../services/utils/country.json';


@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  countries: any[] = countries;
  profileForm: FormGroup;
  logo: any;
  logoname = null;
  iconname = null;
  icon: any;
  constructor( private home: CreateClientComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      domain : ['', Validators.required],
      website: ['', Validators.required],
      logo: [null],
      icon: [null]
    });

    console.log('countries', this.countries);
  }

  nextStep() {
    this.home.stepper(2);
    const formData = this.assignFormDataValues(this.profileForm);
    console.log('form data', this.profileForm.value);
    sessionStorage.setItem('profile-info', JSON.stringify(this.profileForm.value));
  }


  handleImgUpload(event: any) {
    if (event.target.files.length > 0) {
      this.logo = event.target.files[0];
      this.icon = event.target.files[0];
      this.logoname = this.logo.name;
      this.iconname = this.icon.name;
    }
  }


  assignFormDataValues(form: FormGroup) {
    const formData = new FormData();
    Object.keys(form.controls).forEach(key => {
      formData.append(key, form.get(key).value);
    });
    return formData;
  }
}
