import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/data/admin/admin.service';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-role-record',
  templateUrl: './new-role-record.component.html',
  styleUrls: ['./new-role-record.component.css']
})
export class NewRoleRecordComponent implements OnInit {
  allRoles: any;
  newList: any;
  roleData = {
    name: '',
    permissions: [],

  };


  constructor(
    private adminService: AdminService,
    private notifyService: NotificationsService,
    private router: Router,



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
        const tires = [];

        from(this.allRoles)
          .pipe(
            groupBy(
              (person: any) => person.name.split('_')[0]
            ),
            mergeMap(group => zip(of(group.key), group.pipe(toArray())))
          )
          .subscribe(xy => {
            console.log('levels', ...xy);
            tires.push(xy);
          });
        this.newList = tires;
        console.log('sasas', this.newList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getID(event) {
    this.roleData.permissions.push(event);
  }

  createRoles() {
    const {name, permissions} = this.roleData;
    const  permissionIds = permissions.map((i) => Number(i));
    console.log(permissionIds);
    const result = {
      name,
      permissionIds
    };
    console.log(this.roleData);
    this.adminService.createRoles(result).subscribe((data: any) => {
      console.log(data);
      this.notifyService.publishMessages('Roles created successfully', 'info', 1);
      this.router.navigateByUrl('/school/account-settings');
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }


}
