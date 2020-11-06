import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Output() sendChildName = new EventEmitter<string>();

  employeeForm: FormGroup;
  constructor(private home: EmployeeComponent, private fb: FormBuilder) { }

  ngOnInit() {
    this.sendChildName.emit('Employee Details');
    this.populateEmployeeDetailsForm();

  }

  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('Employee-Data', JSON.stringify(this.employeeForm.value));

  }

  populateEmployeeDetailsForm() {
    this.employeeForm = this.fb.group({
      staffType: ['', Validators.required],
      employementStatus: ['', Validators.required],
      qualification: ['', Validators.required],
      jobTitle: ['', Validators.required],
      department: [''],
      payGrade: ['', Validators.required],
      employementDate: ['', Validators.required],
      resumptionDate: ['', Validators.required]
    });
  }


}
