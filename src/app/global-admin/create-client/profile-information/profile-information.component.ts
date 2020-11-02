import { Component, OnInit } from '@angular/core';
import { CreateClientComponent } from '../create-client.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { LoaderService } from 'src/services/classes/loader/loader.service';


@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {
  profileForm: FormGroup;
  logoname = null;
  iconname = null;
  constructor( private home: CreateClientComponent, private fb: FormBuilder, private loaderService: LoaderService) { }

  ngOnInit() {
    this.profileForm = this.fb.group({

      Name : ['', Validators.required],
      DomainName : ['', Validators.required],
      WebsiteAddress: ['', Validators.required],
      logo: [null],
      icon: [null]
    });

  }

  nextStep() {
    this.home.stepper(2);
    // const formData = this.assignFormDataValues(this.profileForm);
    console.log('form data', this.profileForm.value);
    sessionStorage.setItem('profile-info', JSON.stringify(this.profileForm.value));
  }


  handleImgUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.logoname = file.name;
      this.profileForm.get('logo').setValue(file);
      // this.iconname = this.icon.name;
    }
  }

  handleIconUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.iconname = file.name;
      this.profileForm.get('icon').setValue(file);
      // this.iconname = this.icon.name;
    }
  }


  // assignFormDataValues(form: FormGroup) {
  //   const formData = new FormData();
  //   Object.keys(form.controls).forEach(key => {
  //     formData.append(key, form.get(key).value);
  //   });
  //   return formData;
  // }
}
