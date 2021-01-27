import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-account-chart',
  templateUrl: './new-account-chart.component.html',
  styleUrls: ['./new-account-chart.component.css']
})
export class NewAccountChartComponent implements OnInit {
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
