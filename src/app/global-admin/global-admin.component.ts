import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-global-admin',
  templateUrl: './global-admin.component.html',
  styleUrls: ['./global-admin.component.css']
})
export class GlobalAdminComponent implements OnInit {
adminDetails: any;
  constructor(private router: Router) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/');
  }

  toggleSideBar() {
    console.log('admin');
    const sidebar = document.querySelector('#sidebar');
    const content = document.querySelector('#content');
    sidebar.classList.toggle('sidebar');
    content.classList.toggle('content');
  }
}
