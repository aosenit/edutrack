import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-vendors',
  templateUrl: './new-vendors.component.html',
  styleUrls: ['./new-vendors.component.css']
})
export class NewVendorsComponent implements OnInit {
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
