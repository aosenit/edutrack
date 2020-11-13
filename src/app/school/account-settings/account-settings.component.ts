import { Component, OnInit } from '@angular/core';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AdminService } from 'src/services/data/admin/admin.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  users = true;
  roles = false;
  allRoles: any;
  newList: any;


  constructor(
    private adminService: AdminService,
    private notifyService: NotificationsService,


  ) { }

  ngOnInit() {
    this.getRolesPermissions();
    this.getRoles();


  }
  showRoles() {
    // tslint:disable-next-line:no-unused-expression
    this.users = false;
    this.roles = true;
  }

  showUsers() {
    this.users = true;
    this.roles = false;
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

  getRoles() {
    this.adminService.getRoles().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allRoles = data.payload;
        console.log(this.allRoles);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }


}
