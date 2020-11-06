import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  adminList: any;
  bulkUpload: FormGroup;
  filename = null;
  constructor(
              private adminService: AdminService ,
              private notifyService: NotificationsService,
              private fb: FormBuilder
              ) { }

  ngOnInit() {
    this.bulkUpload = this.fb.group({
      avatar: []
    });
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
     if (data.hasErrors === false) {
      this.adminList = data.payload;
      console.log(this.adminList);
     }
   }, error => {
    this.notifyService.publishMessages(error.errors, 'danger', 1);

   });
 }

 handleBulkUpload(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    // console.log('file', file);
    this.filename = file.name;
    this.bulkUpload.get('avatar').setValue(file);
    // this.iconname = this.icon.name;
  }
}

UploadBulkFile() {
  console.log(this.bulkUpload.value);
}

}
