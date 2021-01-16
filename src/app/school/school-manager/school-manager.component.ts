import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-manager',
  templateUrl: './school-manager.component.html',
  styleUrls: ['./school-manager.component.css']
})
export class SchoolManagerComponent implements OnInit {
  searchString: string;
  constructor() { }

  ngOnInit() {
  }

}
