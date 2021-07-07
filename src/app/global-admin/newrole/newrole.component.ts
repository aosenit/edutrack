import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AdminService } from 'src/services/data/admin/admin.service';

@Component({
  selector: 'app-newrole',
  templateUrl: './newrole.component.html',
  styleUrls: ['./newrole.component.css']
})
export class NewroleComponent implements OnInit {
  allRoles: any;
  newList: any;
  roleData = {
    name: '',
    permissions: [],

  };
  constructor(
    private fb: FormBuilder,
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
        // ('asasasas', this.allRoles);
        const tires = [];

        from(this.allRoles)
          .pipe(
            groupBy(
              (person: any) => person.name.split('_')[0]
            ),
            mergeMap(group => zip(of(group.key), group.pipe(toArray())))
          )
          .subscribe(xy => {
            // ('levels', ...xy);
            tires.push(xy);
          });
        this.newList = tires;
        // ('sasas', this.newList);
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
    // (permissionIds);
    const result = {
      name,
      permissionIds
    };
    // (this.roleData);
    this.adminService.createRoles(result).subscribe((data: any) => {
      // (data);
      this.notifyService.publishMessages('Roles created successfully', 'info', 1);
      this.router.navigateByUrl('/admin/users');
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  


}
