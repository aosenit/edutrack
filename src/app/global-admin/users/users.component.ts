import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/data/admin/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = true;
  roles = false;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getAllAdmin();
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

 getAllAdmin() {
   this.adminService.getAllAdmin().subscribe(data => {
     if (data) {
       console.log('admis', data);
     }
   });
 }
}
