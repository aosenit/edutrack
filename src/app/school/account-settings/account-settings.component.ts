import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  users = true;
  roles = false;
  constructor() { }

  ngOnInit() {
  }

  showRoles() {
    // tslint:disable-next-line:no-unused-expression
    this.users = false;
    this.roles = true;
  }

  showUsers() {
    this.users = true;
    this.roles = false;
  }
}
