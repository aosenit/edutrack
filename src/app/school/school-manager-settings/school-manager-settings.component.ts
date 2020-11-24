import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-manager-settings',
  templateUrl: './school-manager-settings.component.html',
  styleUrls: ['./school-manager-settings.component.css']
})
export class SchoolManagerSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  back() {
    window.history.back();
  }

}
