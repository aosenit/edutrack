import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
@Output() sendChildName = new EventEmitter<string>();
employeeWorkExperienceForm: FormGroup;
items: any;

  constructor(private home: EmployeeComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.sendChildName.emit('Work experience');
    this.populateEmployeeExperienceForm();
  }

populateEmployeeExperienceForm() {
    this.employeeWorkExperienceForm = this.fb.group({
      WorkExperienceVMs: this.fb.array([ this.createItem() ])
    });
  }

  nextStep() {
    this.home.stepper(7);
    sessionStorage.setItem('employee-experience', JSON.stringify(this.employeeWorkExperienceForm.value));

  }

  prevStep() {
    this.home.stepper(5);
    // this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    // this.currentStep.classList.remove('active');
  }


  createItem(): FormGroup {
    return this.fb.group({
      workRole: ['', Validators.required],
      workCompanyName: ['', Validators.required],
      startTime	: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  addExperience() {
    this.items = this.employeeWorkExperienceForm.get('WorkExperienceVMs') as FormArray;
    this.items.push(this.createItem());
  }


}
