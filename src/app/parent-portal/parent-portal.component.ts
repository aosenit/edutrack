import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-parent-portal',
  templateUrl: './parent-portal.component.html',
  styleUrls: ['./parent-portal.component.css']
})
export class ParentPortalComponent implements OnInit {
  loggedInUser: any;

  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
  }

}
