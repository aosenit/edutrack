import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-setttings',
  templateUrl: './payroll-setttings.component.html',
  styleUrls: ['./payroll-setttings.component.css']
})
export class PayrollSetttingsComponent implements OnInit {

  salary = true;
  grade = false;
  tax = false;
  bank = false;
  exempt = false;
  payroll = false;
  constructor() { }

  ngOnInit() {
  }

  showStatus(status: string) {
    const newStatus = status;

    switch (newStatus ) {

      case 'salary':
          this.salary = true;
          this.grade = false;
          this.tax = false;
          this.bank = false;
          this.exempt = false;
          this.payroll = false;
          break;


      case 'grade':
          this.salary = false;
          this.grade = true;
          this.tax = false;
          this.bank = false;
          this.exempt = false;
          this.payroll = false;
          break;

      case 'tax':
          this.salary = false;
          this.grade = false;
          this.tax = true;
          this.bank = false;
          this.exempt = false;
          this.payroll = false;
          break;

      case 'bank':
          this.salary = false;
          this.grade = false;
          this.tax = false;
          this.bank = true;
          this.exempt = false;
          this.payroll = false;
          break;

      case 'exempt':
          this.salary = false;
          this.grade = false;
          this.tax = false;
          this.bank = false;
          this.exempt = true;
          this.payroll = false;
          break;

        case 'payroll':
            this.salary = false;
            this.grade = false;
            this.tax = false;
            this.bank = false;
            this.exempt = false;
            this.payroll = true;
            break;

      default:
        this.salary = true;
    }

  }

}
