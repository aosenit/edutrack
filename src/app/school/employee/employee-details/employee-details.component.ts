import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/services/data/department/department.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Output() sendChildName = new EventEmitter<string>();
  currentStep: any;

  employeeForm: FormGroup;
  departmentList: any;
  empDetails: any;
  constructor(
    private home: EmployeeComponent,
    private fb: FormBuilder,
    private departmentService: DepartmentService
  ) { }

  ngOnInit() {
    this.sendChildName.emit('Employee Details');
    this.populateEmployeeDetailsForm();
    this.getAllDepartments();
    this.getActiveDetailsTab();

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
    this.departmentService.getAllDepartment().subscribe((data: any) => {
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

  prevStep() {
    this.home.stepper(1);
    // this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    // this.currentStep.classList.remove('active');
  }

  getActiveDetailsTab() {
    this.empDetails = JSON.parse(sessionStorage.getItem('Employee-Data'));

    if (sessionStorage.getItem('Employee-Data') !== null) {
      // console.log(`School person exists`);
      this.employeeForm.patchValue({
        StaffType: this.empDetails.StaffType,
        EmploymentStatus: this.empDetails.EmploymentStatus,
        HighestQualification: this.empDetails.HighestQualification,
        JobTitle: this.empDetails.JobTitle,
        DepartmentId: this.empDetails.DepartmentId,
        PayGrade: this.empDetails.PayGrade,
        EmploymentDate: this.empDetails.EmploymentDate,
        ResumptionDate: this.empDetails.ResumptionDate
      });
    } else {
    }


  }


}
