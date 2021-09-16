import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { PromotionService } from 'src/services/data/promotion/promotion.service';

@Component({
  selector: 'app-class-pool',
  templateUrl: './class-pool.component.html',
  styleUrls: ['./class-pool.component.css']
})
export class ClassPoolComponent implements OnInit {
  classPoolList: any;

  constructor(
    private promotionService: PromotionService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.getClassPoolList();
  }

  getClassPoolList() {
    this.promotionService.getClassPool(2).subscribe((res: any) => {
      if (res.hasErrors === false ) {
        this.classPoolList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

}
