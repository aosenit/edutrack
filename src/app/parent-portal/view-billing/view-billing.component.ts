import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-billing',
  templateUrl: './view-billing.component.html',
  styleUrls: ['./view-billing.component.css']
})
export class ViewBillingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

}
