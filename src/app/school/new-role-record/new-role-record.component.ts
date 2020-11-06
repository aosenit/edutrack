import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-role-record',
  templateUrl: './new-role-record.component.html',
  styleUrls: ['./new-role-record.component.css']
})
export class NewRoleRecordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

}
