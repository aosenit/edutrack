import { Component, OnInit } from '@angular/core';
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

  getEmployeeById(id) {
    this.staffService.getStaffById(id).subscribe( (data: any) => {
      if (data.hasErros === false) {
        console.log('all schools', data);
        this.employeeDetail = data.payload;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

}
