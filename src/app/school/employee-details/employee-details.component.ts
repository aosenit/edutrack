import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/services/data/staff/staff.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
id: any;
employeeDetails: any;
  constructor(
    private route: ActivatedRoute,
    private staffService: StaffService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getStaffById();
  }

  back() {
    window.history.back();
  }

  getStaffById() {
    this.staffService.getStaffById(this.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.employeeDetails = data.payload;
        // ('asasasasas', this.employeeDetails);
      }
    });
  }
}
