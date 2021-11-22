import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  record = false;
  parentList: any;
  searchString: string;
  p = 1;
  itemsPerPage = 10;
  parentCount: number;
  adminDetails: any;

  constructor(
    private parentService: ParentsService,
    private notifyService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllParents();
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
  }

  getAllParents() {
    this.parentService.getAllParentsInASchool(this.adminDetails.TenantId, this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.parentList = data.payload;
        this.parentCount = data.totalCount;
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
      });
  }

  getPage(page: number) {
    // (page);
    this.parentService.getAllParentsInASchool(this.adminDetails.TenantId, page, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.parentList = data.payload;
        this.parentCount = data.totalCount;
      }
    },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
      });

  }

  editParent(id) {
    // (id);
    this.parentService.getParentById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        sessionStorage.setItem('all-parent-info', JSON.stringify(data.payload));
        this.router.navigateByUrl('/school/edit-parent/' + id);
      }
    });
  }

  deleteParent(id) {
    this.notifyService.publishMessages('Service currently down', 'danger', 1);
    // this.parentService.deleteParentById(id).subscribe((data: any) => {
    //   if (data.hasErrors === false) {
    //     // (data.payload);
    //     this.notifyService.publishMessages('Parent deleted successfully', 'success', 1);

    //   }
    // }, error => {
    //   this.notifyService.publishMessages(error.message, 'danger', 1);

    // });
  }

  clearStorage() {
    sessionStorage.removeItem('parent-basic-details');
    sessionStorage.removeItem('parent-social-details');

  }
}
