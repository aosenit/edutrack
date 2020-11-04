import { Component, OnInit } from '@angular/core';
import { CreateClientComponent } from '../create-client.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  profileForm: FormGroup;

  constructor( private home: CreateClientComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({

      Name : ['', Validators.required],
      DomainName : ['', Validators.required],
      WebsiteAddress: ['', Validators.required],

    });

  }

  nextStep() {
    this.home.stepper(2);
    // const formData = this.assignFormDataValues(this.profileForm);
    sessionStorage.setItem('profile-info', JSON.stringify(this.profileForm.value));
  }



  // assignFormDataValues(form: FormGroup) {
  //   const formData = new FormData();
  //   Object.keys(form.controls).forEach(key => {
  //     formData.append(key, form.get(key).value);
  //   });
  //   return formData;
  // }
}
