import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AdminService } from 'src/services/data/admin/admin.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
allRoles: any;
permissions: any;
  constructor(
    private adminService: AdminService,
    private notifyService: NotificationsService

  ) { }

  ngOnInit() {
    this.getRolesPermissions();
  }

  back() {
    window.history.back();
  }

  getRolesPermissions() {
    this.adminService.getAllPermissions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allRoles = data.payload;
        const users = this.allRoles.filter((element: any) => {
         return element.name.includes('USER');
        });
        console.log(users);
        console.log(this.allRoles);
        this.permissions = {
          create : users[0].name,
          create_id: users[0].id,
          view : users[1].name,
          view_id: users[1].id,
          update : users[2].name,
          update_id: users[2].id,
          delete : users[3].name,
          delete_id: users[3].id,

        };
        console.log(this.permissions);
       }
     }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
     });
  }

  getValue(event) {
    console.log(event);
  }

}
