import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  @Output() sendChildName = new EventEmitter<string>();

  iconname = null;
  personalDetailsForm: FormGroup;
  toggleState: any;
  constructor(private home: EmployeeComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.sendChildName.emit('Personal Information');
    this.populatePersonalDataForm();
  }


  populatePersonalDataForm() {
    this.personalDetailsForm = this.fb.group({
      contactFirstName: ['', Validators.required],
      ContactLastName: ['', Validators.required],
      ContactOtherName: ['', Validators.required],
      dob: ['', Validators.required],
      sex: [''],
      maritalStatus: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      religion: ['', Validators.required],
      nationality: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      status: ['']
    });
  }



  nextStep() {
    this.home.stepper(2);
    sessionStorage.setItem('Personal-Data', JSON.stringify(this.personalDetailsForm.value));
  }

  // handleIconUpload(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log('file', file);
  //     this.iconname = file.name;
  //     // this.profileForm.get('icon').setValue(file);
  //     // this.iconname = this.icon.name;
  //   }
  // }


  submitPersonalDetails() {
    console.log(this.personalDetailsForm.value);
    sessionStorage.setItem('personal-data', JSON.stringify(this.personalDetailsForm.value));
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }

}
