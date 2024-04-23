import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-school-manager',
  templateUrl: './school-manager.component.html',
  styleUrls: ['./school-manager.component.css']
})
export class SchoolBranchManagerComponent implements OnInit {
  adminDetails: any;

  constructor(
    private router: Router

  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
  }


  toggleSideBar() {
    // console.log('admin');
    const sidebar = document.querySelector('#sidebar');
    const content = document.querySelector('#content');
    sidebar.classList.toggle('sidebar');
    content.classList.toggle('content');
  }

  toggleMobileSideBar() {
    // console.log('na me')
    const sidebar = document.querySelector('#sidebar');
    const content = document.querySelector('#content');
    sidebar.classList.toggle('removeSidebar');
    content.classList.toggle('mcontent');
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/');
  }

}
