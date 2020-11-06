import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  countries: any = countries;
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
      schoolName: ['', Validators.required],
      schoolType: ['', Validators.required],
      schoolCountry: ['', Validators.required],
    });
  }


}
