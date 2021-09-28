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

  markPaid() {
    const payload = {
      invoiceId: 0,
      expiryDate: '2021-09-28T10:39:17.270Z'
    };
    this.subscriptionService.MarkInvoiceAsPaid(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        document.getElementById('close').click();
        // console.log(res.payload);
        this.notifyService.publishMessages(res.description, 'success', 1);
      } else {
        this.notifyService.publishMessages(res.errors, 'success', 1);

      }
    });
  }

  back() {
    window.history.back();
  }





}
