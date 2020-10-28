import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/services/data/admin/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    const id = JSON.stringify(localStorage.getItem('access_token'));
    console.log('dsd', id);
  }

  getAdmin() {

    this.adminService.getloggedInAdmin(id).subscribe( res => {
      console.log(res);
    });
  }

}
