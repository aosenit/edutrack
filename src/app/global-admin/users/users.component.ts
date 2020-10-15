import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = true;
  roles = false;
  constructor() { }

  ngOnInit() {
  }

 showBanner(status: string) {
  const newStatus = status;
  switch (newStatus) {
    case 'users':
      this.users = true;
      this.roles = false;
      break;
    case 'roles':
      this.users = false;
      this.roles = true;
      break;
    default:
      this.users = true;
  }
 }
}
