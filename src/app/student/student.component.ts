import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
studentDetails: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.studentDetails = helper.decodeToken(localStorage.getItem('access_token'));

  }

  logOut() {
    localStorage.removeItem('access_token');
    this.router.navigateByUrl('/');
  }

}
