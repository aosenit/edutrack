import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
emptyRecord: any;
emptyList: any;
  constructor(
              private schoolServices: SchoolService,
              private notifyService: NotificationsService,
              ) { }

  ngOnInit() {
    this.getAllSchools();
  }

  getAllSchools() {
    this.schoolServices.getAllSchools().subscribe( (data: any) => {
      if (data) {
        this.emptyRecord = data.payload.length;
        if (this.emptyRecord === 0) {
          this.emptyList = true;
        } else {
          console.log('sdds', this.emptyRecord);
          this.emptyList = false;
        }

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

}
