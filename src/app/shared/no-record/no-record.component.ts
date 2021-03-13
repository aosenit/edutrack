import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-record',
  templateUrl: './no-record.component.html',
  styleUrls: ['./no-record.component.css']
})
export class NoRecordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  reload() {
    location.reload();
  }

}
