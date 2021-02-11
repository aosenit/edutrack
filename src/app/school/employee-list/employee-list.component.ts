import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { StaffService } from 'src/services/data/staff/staff.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
record = false;
employeeList: any;
employeeDetail: any;
searchString: string;

  constructor(
              private staffService: StaffService,
              private notifyService: NotificationsService,
              private router: Router
              ) { }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.staffService.getAllStaffInSchool().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.employeeList = data.payload;
        console.log('all employees', this.employeeList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  // getEmployeeById(id) {
  //   this.staffService.getStaffById(id).subscribe( (data: any) => {
  //     if (data.hasErros === false) {
  //       console.log('all schools', data);
  //       this.employeeDetail = data.payload;
  //     }
  //   }, error => {
  //     this.notifyService.publishMessages(error.errors, 'danger', 1);

  //   });
  // }

  addNewEmp() {

  }

  editEmployee(id) {
    console.log(id);
    this.staffService.getStaffById(id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        sessionStorage.setItem('all-employee-info', JSON.stringify(data.payload));
        this.router.navigateByUrl('/school/edit-employee/' + id);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }


  deleteEmployee(id) {
    console.log(id);
    this.staffService.deleteStaffById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
      this.notifyService.publishMessages('Staff deleted', 'success', 1);

      }
    }, error => {
            this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  clearData() {
    sessionStorage.removeItem('employee-personal-data');
    sessionStorage.removeItem('Employee-Data');
    sessionStorage.removeItem('employee-contact-details');
    sessionStorage.removeItem('employee-education');
    sessionStorage.removeItem('employee-next-kin');
    sessionStorage.removeItem('employee-experience');
  }

}
