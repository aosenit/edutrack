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
  minDate: string;
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
        this.sendChildName.emit('Education');
        this.getProfileInformation();
      }
    });
    this.getAActiveTab();
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


  getStartDate(e) {
    this.minDate = moment(e).format('YYYY-MM-DD');
  }

  getAActiveTab() {
    this.educationalDetials = JSON.parse(sessionStorage.getItem('employee-education'));

    if (sessionStorage.getItem('employee-education') !== null) {
      // tslint:disable-next-line:max-line-length
      this.EmployeeEducationForm.setControl('EducationExperienceVMs', this.setExistingComponent(this.educationalDetials.EducationExperienceVMs));

    } else {
    }

  }

  getProfileInformation() {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));

    this.EmployeeEducationForm.setControl('EducationExperienceVMs', this.setExistingComponent(payload.educationExperienceVMs));

  }

  setExistingComponent(data: any) {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));

    const formArray = new FormArray([]);
    for (const x of data) {
      // // (x);
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
