import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notification: any;

  constructor(private notify: NotificationsService) { }

  ngOnInit() {
    this.notify.alertStatus.subscribe(
      res =>{
        // console.log(res);
        this.notification = res
      }
    )
  }
 
  dismiss(){
    this.notify.dismissMessage()
  }

}
