import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DepartmentService } from 'src/services/data/department/department.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Output() sendChildName = new EventEmitter<string>();

  employeeForm: FormGroup;
  departmentList: any;

  constructor(
              private home: EmployeeComponent,
              private fb: FormBuilder,
              private departmentService: DepartmentService
              ) { }

  ngOnInit() {
    this.sendChildName.emit('Employee Details');
    this.populateEmployeeDetailsForm();
    this.getAllDepartments();

  }

  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('Employee-Data', JSON.stringify(this.employeeForm.value));
    console.log(this.employeeForm.value);
  }

  populateEmployeeDetailsForm() {
    this.employeeForm = this.fb.group({
      StaffType: ['', Validators.required],
      EmploymentStatus: ['', Validators.required],
      HighestQualification: ['', Validators.required],
      JobTitle: ['', Validators.required],
      DepartmentId: [''],
      PayGrade: ['', Validators.required],
      EmploymentDate: ['', Validators.required],
      ResumptionDate: ['', Validators.required]
    });
  }

  getAllDepartments() {
    this.departmentService.getAllDepartment().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.departmentList = data.payload;
      }
   }, error => {
    // this.notification.publishMessages(error.errors, 'info', 1);

   });
  }

  back() {
    window.history.back();
  }


}
