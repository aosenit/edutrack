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
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      OtherNames: ['', Validators.required],
      MothersMaidenName: ['', Validators.required],
      Sex: [''],
      DateOfBirth: ['', Validators.required],
      Religion: ['', Validators.required],
      Nationality: ['', Validators.required],
      ParentId : ['', Validators.required],
      StateOfOrigin: ['', Validators.required],
      LocalGovt: [''],
      TransportRoute: ['', Validators.required]
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

  getAllParents() {
    this.parentService.getAllParentsWithName().subscribe(
      (res: any) => {
        this.parents = res.payload;
        console.log(this.parents);
      }
    );
  }

}
