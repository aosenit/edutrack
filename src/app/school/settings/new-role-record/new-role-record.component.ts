import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/data/admin/admin.service';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-new-role-record',
  templateUrl: './new-role-record.component.html',
  styleUrls: ['./new-role-record.component.css']
})
export class NewRoleRecordComponent implements OnInit {
  allRoles: any;
  newList: any;
  roleId: any;
  roleData = {
    name: '',
    permissions: [],

  };


  constructor(
    private adminService: AdminService,
    private notifyService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute



  ) { }

  ngOnInit() {
    this.getRolesPermissions();
    this.roleId = this.route.snapshot.params.id;
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.getRolesPermissions();
      } else {
        this.getRolePermissionsByRoleId();

      }
    });


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
            // console.log('levels', ...xy);
            tires.push(xy);
          });
        this.newList = tires;
        // console.log('sasas', this.newList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getID(event, id) {
    console.log(event, id);
    if (event === true) {
      this.roleData.permissions.push(id);
      console.log(this.roleData.permissions);
    } else {
      const index = this.roleData.permissions.indexOf(id);
      if (index > -1) {
        this.roleData.permissions.splice(index, 1);
        console.log(this.roleData.permissions);
      }
    }
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
      } else {

      }
    });
  }

  createRoles() {
    const {name, permissions} = this.roleData;
    const  permissionIds = permissions.map((i) => Number(i));
    console.log(permissionIds);
    const result = {
      name,
      permissionIds
    };
    // console.log(this.roleData);
    this.adminService.createRoles(result).subscribe((data: any) => {
      // console.log(data);
      this.notifyService.publishMessages('Roles created successfully', 'info', 1);
      this.router.navigateByUrl('/school/settings/account-settings');
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  getRolePermissionsByRoleId() {
    this.adminService.getAllPermissionForRoleById(this.roleId).subscribe((data: any) => {
      if (data.hasErrors === false) {
          console.log(data.payload);
          this.roleData.name = data.payload.roleName;
          // this.roleData.permissions = data.payload.permission;

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
          const newList2 = tires;
          // console.log(newList2);
          // tslint:disable-next-line:prefer-for-of
          // for (let i = 0; i < newList2.length; i++) {
          //   console.log(newList2[i][0]);
          //   if (newList2[i][0] && newList2[i][1].id === )
          // }
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  prefillpermissions() {

  }

  updateRoles() {
    const {name, permissions} = this.roleData;
    const  permissionIds = permissions.map((i) => Number(i));
    console.log(permissionIds);
    const result = {
      name,
      permissionIds
    };
    console.log(result);
    // this.adminService.createRoles(result).subscribe((data: any) => {
    //   // console.log(data);
    //   this.notifyService.publishMessages('Roles created successfully', 'info', 1);
    //   this.router.navigateByUrl('/school/account-settings');
    // }, error => {
    //   this.notifyService.publishMessages(error.errors, 'danger', 1);
    // });
  }


}
