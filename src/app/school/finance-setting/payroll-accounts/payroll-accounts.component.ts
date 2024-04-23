import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-accounts',
  templateUrl: './payroll-accounts.component.html',
  styleUrls: ['./payroll-accounts.component.css']
})
export class PayrollAccountsComponent implements OnInit {
  toggleState = false;

  constructor() { }

  ngOnInit() {
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }

  back() {
    window.history.back();
  }

}
