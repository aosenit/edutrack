import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { countries } from '../../../../services/utils/country.json';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {
  countries: any = countries;
  states: any[];
  basicDetailsForm: FormGroup;
  parents: any;
  constructor(private home: AddStudentsComponent, private parentService: ParentsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.basicDetailsForm = this.fb.group({
      ContactFirstName: ['', Validators.required],
      ContactLastName: ['', Validators.required],
      ContactOtherName: ['', Validators.required],
      motherName: ['', Validators.required],
      sex: [''],
      dob: ['', Validators.required],
      profilePhoto: null,
      religion: ['', Validators.required],
      nationality: ['', Validators.required],
      parents: ['', Validators.required],
      state: ['', Validators.required],
      lga: ['', Validators.required],
      transportRoute: ['', Validators.required]
    });

    this.getAllParents();
  }

  nextStep() {
    this.home.stepper(2);
    sessionStorage.setItem('basic-details', JSON.stringify(this.basicDetailsForm.value));
  }

  getState(event) {
    for (const unit in countries) {
      if (event === countries[unit].country) {
        const state = countries[unit].states;
        this.states = state;
      }
    }

  }

  getAllParents(){
    this.parentService.getAllParents().subscribe(
      res => {
        this.parents = res['payload']
      }
    )
  }

}
