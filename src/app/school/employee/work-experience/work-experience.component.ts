import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
@Output() sendChildName = new EventEmitter<string>();
employeeWorkExperienceForm: FormGroup;

  constructor(private home: EmployeeComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.sendChildName.emit('Work experience');
    this.populateEmployeeExperienceForm();
  }

  nextStep() {
    this.home.stepper(7);
    sessionStorage.setItem('employee-experience', JSON.stringify(this.employeeWorkExperienceForm.value));

  }

  populateEmployeeExperienceForm() {
    this.employeeWorkExperienceForm = this.fb.group({
      workRole: ['', Validators.required],
      workCompany: ['', Validators.required],
      experienceFrom: ['', Validators.required],
      experienceTo: ['', Validators.required],
    });
  }


}
