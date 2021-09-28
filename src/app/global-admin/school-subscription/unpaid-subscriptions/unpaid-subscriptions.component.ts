import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { SubscriptionsService } from 'src/services/data/subscriptions/subscriptions.service';

@Component({
  selector: 'app-unpaid-subscriptions',
  templateUrl: './unpaid-subscriptions.component.html',
  styleUrls: ['./unpaid-subscriptions.component.css']
})
export class UnpaidSubscriptionsComponent implements OnInit {

  subscriptionList: any;
  schoolId: any;
  unpaidInvoice: any;

  constructor(
    private subscriptionService: SubscriptionsService,
    private schoolServie: SchoolService,
    private notifyService: NotificationsService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.schoolId = this.route.snapshot.params.id;
    this.getAllSubscriptionCreated();
  }

  getAllSubscriptionCreated() {
    this.subscriptionService.getUnpaidUnvoice(this.schoolId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log('ds', res.payload);
        this.unpaidInvoice = res.payload;
      }
    });
  }

  back() {
    window.history.back();
  }





}
