import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Params } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  countries: any = countries;
  items: any;
  educationalDetials: any;
  EmployeeEducationForm: FormGroup;

  @Output() sendChildName = new EventEmitter<string>();
  constructor(
    private home: EmployeeComponent,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sendChildName.emit('Education');
    this.populateEducationForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateEducationForm();
      } else {
        this.getProfileInformation();

      }
    });
  }

  populateEducationForm() {
    this.EmployeeEducationForm = this.fb.group({
      EducationExperienceVMs: this.fb.array([this.createItem()])
    });
  }
  nextStep() {
    this.home.stepper(6);
    sessionStorage.setItem('employee-education', JSON.stringify(this.EmployeeEducationForm.value));

  }

  prevStep() {
    this.home.stepper(4);
    // this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    // this.currentStep.classList.remove('active');
  }



  addEducation() {
    this.items = this.EmployeeEducationForm.get('EducationExperienceVMs') as FormArray;
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      educationSchoolName: '',
      educationSchoolQualification: '',
      startDate: '',
      endDate: '',
    });
  }

  getAActiveTab() {
    this.educationalDetials = JSON.parse(sessionStorage.getItem('employee-education'));

    if (sessionStorage.getItem('employee-next-kin') !== null) {
      // console.log(`School person exists`);
      this.EmployeeEducationForm.patchValue({
        EducationExperienceVMs: this.educationalDetials.educationExperienceVMs,
      });
    } else {
    }

  }

  getProfileInformation() {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));

    // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < payload.educationExperienceVMs.length; i++) {
    //   console.log('asasaass', payload.educationExperienceVMs[i]);
    //   const newData = this.EmployeeEducationForm.controls.EducationExperienceVMs.value;
    //   // tslint:disable-next-line:prefer-for-of
    //   for (let j = 0; j < newData.length; j++) {
    //     newData[j].educationSchoolName = payload.educationExperienceVMs[i].educationSchoolName;
    //     newData[j].educationSchoolQualification = payload.educationExperienceVMs[i].educationSchoolQualification;
    //     newData[j].endDate = moment(payload.educationExperienceVMs[i].endDate).format('YYYY-MM-DD');
    //     newData[j].startDate = moment(payload.educationExperienceVMs[i].startDate).format('YYYY-MM-DD');
    //   }
    //   console.log(newData);

    //   // this.EmployeeEducationForm.patchValue({
    //   //     EducationExperienceVMs: payload.educationExperienceVMs.educationSchoolName,
    //   // });

    // }
    this.EmployeeEducationForm.setControl('EducationExperienceVMs', this.setExistingComponent(payload.educationExperienceVMs));

  }

  setExistingComponent(data: any) {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));

    const formArray = new FormArray([]);
    for (const x of data) {
      console.log(x);
      formArray.push(this.fb.group({
       educationSchoolName: x.educationSchoolName,
       educationSchoolQualification: x.educationSchoolQualification,
       startDate: moment(x.startDate).format('YYYY-MM-DD'),
       endDate: moment(x.endDate).format('YYYY-MM-DD'),
     }));
   }

    return formArray;
 }


}
