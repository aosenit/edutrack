import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AdminService } from 'src/services/data/admin/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = true;
  roles = false;
  constructor(
              private adminService: AdminService ,
              private notifyService: NotificationsService,
              ) { }

  ngOnInit() {
    this.showAllAdmin();
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

 showAllAdmin() {
   this.adminService.getAllAdmin().subscribe( (data: any) => {
     if (data) {
       console.log('all admin gotten', data.payload);
     }
   }, error => {
    this.notifyService.publishMessages(error.errors, 'danger', 1);

   });
 }

}
