import { Component, OnInit } from '@angular/core';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AdminService } from 'src/services/data/admin/admin.service';
import { StaffService } from 'src/services/data/staff/staff.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  users = true;
  roles = true;
  allRoles: any;
  allStaffs: any;
  newList: any;
  dropdownSettings = {};
  dropdownSettings2 = {};
  dropRoleList = [];
  dropStaffList = [];
  assignRoleForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private notifyService: NotificationsService,
    private staffServie: StaffService,
    private fb: FormBuilder


  ) { }

  ngOnInit() {
    this.populateAssignRoleForm();
    this.getRolesPermissions();
    this.getRoles();
    this.getStaffs();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'arm',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'id',
      textField: 'arm',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

  }

  populateAssignRoleForm() {
    this.assignRoleForm = this.fb.group({
      userid : ['', Validators.required],
      roleid: ['', Validators.required]
    });
  }
  // toggle banner
  showRoles() {
    this.users = false;
    this.roles = true;
  }

  // showUsers() {
  //   this.users = true;
  //   this.roles = false;
  // }


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
            tires.push(xy);
          });
        this.newList = tires;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getRoles() {
    this.adminService.getRoles().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allRoles = data.payload;
        console.log(this.allRoles);
        const arr = [];
        this.allRoles.forEach(item => {
          arr.push({
            id: item.id,
            arm: item.name
          });
        });
        this.dropRoleList = arr;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  getStaffs() {
    this.staffServie.getAllStaffInSchool().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allStaffs = data.payload;
        console.log(this.allStaffs);
        const arr = [];
        this.allStaffs.forEach(item => {
          arr.push({
            // id: item.id,
            userId: item.userId,
            arm: item.firstName
          });
        });
        this.dropStaffList = arr;
      }
    });
  }

  submit() {
    const {userid, roleid} = this.assignRoleForm.value;
    const newUSerId = userid.map((ids: any) => {
      return ids.userId;
    });
    console.log(newUSerId);
    const roleIds = roleid.map((ids: any) => {
      return ids.id;
    });
    // tslint:disable-next-line:radix
    const userId = parseInt(newUSerId);
    // tslint:disable-next-line:radix
    // const roleIds = parseInt(newRoleId);
    const result = {
      userId,
      roleIds
    };
    console.log(result);
    this.adminService.assignRolesToUsers(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('roles successfully assigned', 'info', 1);
        document.getElementById('close').click();
        console.log(data);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }


}
