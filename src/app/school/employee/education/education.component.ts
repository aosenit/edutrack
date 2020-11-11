import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  countries: any = countries;
  items: any;
  EmployeeEducationForm: FormGroup;

@Output() sendChildName = new EventEmitter<string>();
  constructor(private home: EmployeeComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.sendChildName.emit('Education');
    this.populateNextofKinForm();
  }

  nextStep() {
    this.home.stepper(6);
    sessionStorage.setItem('employee-education', JSON.stringify(this.EmployeeEducationForm.value));

  }

  populateNextofKinForm() {
    this.EmployeeEducationForm = this.fb.group({
      EducationExperienceVMs: this.fb.array([ this.createItem() ])
    });
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


}
