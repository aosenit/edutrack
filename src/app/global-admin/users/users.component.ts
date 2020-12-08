import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AdminService } from 'src/services/data/admin/admin.service';
import { of, from, zip } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users = true;
  roles = false;
  adminList: any;
  allRoles: any;
  bulkUpload: FormGroup;
  filename = null;
  constructor(
    private adminService: AdminService,
    private notifyService: NotificationsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bulkUpload = this.fb.group({
      avatar: []
    });
    this.showAllAdmin();
    // this.getRolesPermissions();
    // this.getRoles();
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
    this.adminService.getAllAdmin().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.adminList = data.payload;
        this.adminList = this.adminList.reverse();
        // console.log(this.adminList);
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

  // getRolesPermissions() {
  //   this.adminService.getAllPermissions().subscribe((data: any) => {
  //     if (data.hasErrors === false) {
  //       this.allRoles = data.payload;

  //       from(this.allRoles)
  //         .pipe(
  //           groupBy(
  //             (person: any) => person.name.split('_')[0]
  //           ),
  //           mergeMap(group => zip(of(group.key), group.pipe(toArray())))
  //         )
  //         .subscribe(console.log);
  //     }
  //   }, error => {
  //     this.notifyService.publishMessages(error.errors, 'danger', 1);

  //   });
  // }

  // getRoles() {
  //   this.adminService.getRoles().subscribe((data: any) => {
  //     if (data.hasErrors === false) {
  //       this.allRoles = data.payload;
  //       console.log(this.allRoles);
  //     }
  //   }, error => {
  //     this.notifyService.publishMessages(error.errors, 'danger', 1);
  //   });
  // }

}
