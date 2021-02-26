import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ParentsService } from 'src/services/data/parents/parents.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedInUser: any;
  greet: string;
  schoolTenantId: any;

  constructor(
    private parentService: ParentsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
    this.greeting();
    this.getChildInSelectedSchool();
    this.schoolTenantId = this.route.snapshot.params.id;
    sessionStorage.setItem('tenant', this.schoolTenantId);

  }

  greeting() {
    const myDate = new Date();
    const hrs = myDate.getHours();


    if (hrs < 12) {
      this.greet = 'Good Morning';
    } else if (hrs >= 12 && hrs <= 17) {
      this.greet = 'Good Afternoon';
    } else if (hrs >= 17 && hrs <= 24) {
      this.greet = 'Good Evening';
    }
  }

  getChildInSelectedSchool() {
    this.parentService.getChildInASchoolForParent().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        console.log(data.payload);
      }
    });
  }

}
