import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-parent-portal',
  templateUrl: './parent-portal.component.html',
  styleUrls: ['./parent-portal.component.css']
})
export class ParentPortalComponent implements OnInit {
  loggedInUser: any;
  schoolList: any;

  constructor(
    private router: Router,
    private notifyService: NotificationsService,
    private parentService: ParentsService
  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
    this.getStudentSchools();
  }

  getStudentSchools() {
    this.parentService.getStudentSchools().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.schoolList = data.payload;
      }
    }, error => {
      this.notifyService.publishMessages('Cannot get child schools', 'danger', 1);

    });
  }

  getTenantId(id) {
    sessionStorage.setItem('tenant', id);

  }

  logOut() {
    localStorage.removeItem('access_token');
    setTimeout(() => {
      this.notifyService.publishMessages('Logged out successfully', 'success', 1);
      this.router.navigateByUrl('/');

    }, 2000);
  }

}
