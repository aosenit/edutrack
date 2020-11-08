import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  record = false;
  parentList: any;
  constructor(
              private parentService: ParentsService,
              private notifyService: NotificationsService,
  ) { }

  ngOnInit() {
    this.getAllParents();
  }

  getAllParents() {
    this.parentService.getAllParents().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.parentList = data.paylaod;
      }
    },
    error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }

}
