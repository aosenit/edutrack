import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-next-of-kin',
  templateUrl: './next-of-kin.component.html',
  styleUrls: ['./next-of-kin.component.css']
})
export class NextOfKinComponent implements OnInit {
  countries: any = countries;
  states: any[];
  nextOfKinForm: FormGroup;

@Output() sendChildName = new EventEmitter<string>();
  constructor(private home: EmployeeComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.sendChildName.emit('Next Of Kin Information');
    this.populateNextofKinForm();
  }

  nextStep() {
    this.home.stepper(5);
    sessionStorage.setItem('employee-next-kin', JSON.stringify(this.nextOfKinForm.value));
  }

  getState(event) {
    for (const unit in countries) {
        if (event === countries[unit].country) {
          const state = countries[unit].states;
          this.states = state;
        }
      }

    }

    populateNextofKinForm() {
      this.nextOfKinForm = this.fb.group({
        nextKinFirstName: ['', Validators.required],
        nextKinLastName: ['', Validators.required],
        nextKinOtherName: ['', Validators.required],
        nextKinRelationship: ['', Validators.required],
        nextKinOccupation: [''],
        nextKinPhone: ['', Validators.required],
        nextKinCountry: ['', Validators.required],
        nextKinAddress: ['', Validators.required],
        nextKinState: ['', Validators.required],
        nextKinCity: ['', Validators.required]
      });
    }

}
