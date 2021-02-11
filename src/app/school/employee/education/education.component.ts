import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Params } from '@angular/router';


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
    for (let i = 0; i < payload.educationExperienceVMs.length; i++) {
      console.log('asasaass', payload.educationExperienceVMs[i]);
    }
    this.EmployeeEducationForm.patchValue({
        EducationExperienceVMs: payload.educationExperienceVMs,
    });
  }


}
