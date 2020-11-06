import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  @Output() sendChildName = new EventEmitter<string>();

  constructor(private home: EmployeeComponent) { }

  ngOnInit() {
    this.sendChildName.emit('Employee Details');

  }

  nextStep() {
    this.home.stepper(3);
  }

}
