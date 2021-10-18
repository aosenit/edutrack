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
  prefillPermission: any;
  checkBox = false;


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
            // // ('levels', ...xy);
            tires.push(xy);
          });
        this.newList = tires;
        // // ('sasas', this.newList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getID(event, id) {
    // (event, id);
    if (event === true) {
      this.roleData.permissions.push(id);
    } else {
      const index = this.roleData.permissions.indexOf(id);
      if (index > -1) {
        this.roleData.permissions.splice(index, 1);
        // (this.roleData.permissions);
      }
    }
  }

  createRoles() {
    const {name, permissions} = this.roleData;
    const  permissionIds = permissions.map((i) => Number(i));
    // (permissionIds);
    const result = {
      name,
      permissionIds
    };
    // // (this.roleData);
    this.adminService.createRoles(result).subscribe((data: any) => {
      // // (data);
      this.notifyService.publishMessages('Roles created successfully', 'info', 1);
      this.router.navigateByUrl('/school/settings/account-settings');
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  getRolePermissionsByRoleId() {
    this.adminService.getAllPermissionForRoleById(this.roleId).subscribe((data: any) => {
      if (data.hasErrors === false) {
          // (data.payload);
          this.roleData.name = data.payload.roleName;
          this.prefillPermission = data.payload.permissions;
          const roleList = [];

          from(this.allRoles)
          .pipe(
            groupBy(
              (person: any) => person.name.split('_')[0]
            ),
            mergeMap(group => zip(of(group.key), group.pipe(toArray())))
          )
          .subscribe(xy => {

            roleList.push(xy);
          });
          const newList2 = roleList;
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < newList2.length; i++) {
              const nextiteration = newList2[i][1];
              // tslint:disable-next-line:prefer-for-of
              for (let index = 0; index < nextiteration.length; index++) {
              // tslint:disable-next-line:forin
              for (const key in this.prefillPermission) {
                if (this.newList[i][1][index].id === this.prefillPermission[key].id) {

                  this.newList[i][1][index].checked = true;
                  this.roleData.permissions.push(this.prefillPermission[key].id);

                 }
              }

            }
          }
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
    // (permissionIds);
    const result = {
      roleId: this.roleId,
      permissionIds
    };
    // console.log(result);
    this.adminService.updateRoles(result).subscribe((data: any) => {
      // // (data);
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Roles created successfully', 'info', 1);
        this.router.navigateByUrl('/school/account-settings');

      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }


}
