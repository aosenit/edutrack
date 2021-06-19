import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.css']
})
export class LandingScreenComponent implements OnInit {
  schoolList: any;
  schoolTenantId: any;

  constructor(
    private parentService: ParentsService,
    private notifyService: NotificationsService,

  ) { }

  ngOnInit() {
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

}
