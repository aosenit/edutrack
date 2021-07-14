import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { DepartmentService } from 'src/services/data/department/department.service';
@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.css']
})
export class PersonalSettingsComponent implements OnInit {

  dept = true;
  job = false;
  toggleState = false;

  employment = false;
  qualification = false;
  occupation = false;
  departmentForm: FormGroup;
  departmentList: any;

  constructor(
          private fb: FormBuilder,
          private departmentService: DepartmentService,
          private notification: NotificationsService
  ) { }

  ngOnInit() {
    this.populateDepartmentForm();
    this.getAllDepartments();
  }

  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus ) {

      case 'dept':
          this.dept = true;
          this.job = false;
          this.employment = false;
          this.qualification = false;
          this.occupation = false;
          break;


      case 'job':
          this.dept = false;
          this.job = true;
          this.employment = false;
          this.qualification = false;
          this.occupation = false;
          break;

      case 'employment':
          this.dept = false;
          this.job = false;
          this.employment = true;
          this.qualification = false;
          this.occupation = false;
          break;

      case 'qualification':
          this.dept = false;
          this.job = false;
          this.employment = false;
          this.qualification = true;
          this.occupation = false;
          break;

      case 'occupation':
          this.dept = false;
          this.job = false;
          this.employment = false;
          this.qualification = false;
          this.occupation = true;
          break;

      default:
        this.dept = true;
    }
  }

  populateDepartmentForm() {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [false]
    });
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }

  createDepartment() {
   this.departmentService.addDepartment(this.departmentForm.value).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.notification.publishMessages('Department added successfully', 'info', 1);
        document.getElementById('closeModal').click();
        this.getAllDepartments();
        this.departmentForm.reset();
      }
   }, error => {
    this.notification.publishMessages(error.errors, 'info', 1);

   });
  }

  getAllDepartments() {
    this.departmentService.getAllDepartment().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.departmentList = data.payload;
      }
   }, error => {
    this.notification.publishMessages(error.errors, 'info', 1);

   });
  }

  deleteDepartment(id) {
    this.departmentService.deleteDepartment(id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.notification.publishMessages('You have successfully deleted a department', 'info', 0);
        this.getAllDepartments();
      }
   }, error => {
    this.notification.publishMessages(error.errors, 'info', 1);

   });
  }

 }
