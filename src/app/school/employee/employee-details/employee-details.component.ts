import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/services/data/department/department.service';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
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
    private departmentService: DepartmentService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.sendChildName.emit('Employee Details');
    this.populateEmployeeDetailsForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateEmployeeDetailsForm();
      } else {
        this.getProfileInformation();

      }
    });
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

  getProfileInformation() {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));
    console.log(payload.employeeDetails);
    this.employeeForm.patchValue({
      StaffType: payload.employmentDetails.staffType,
      EmploymentStatus: payload.employmentDetails.employmentStatus,
      HighestQualification: payload.employmentDetails.highestQualification,
      JobTitle: payload.employmentDetails.jobTitle,
      DepartmentId: payload.employmentDetails.departmentId,
      PayGrade: payload.employmentDetails.payGrade,
      EmploymentDate: moment(payload.employmentDetails.employmentDate).format('YYYY-MM-DD'),
      ResumptionDate: moment(payload.employmentDetails.resumptionDate).format('YYYY-MM-DD')
    });
  }


}
