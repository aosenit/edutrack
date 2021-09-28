import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
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
        this.unpaidInvoice = res.payload[0];
      }
    });
  }

  markPaid() {
    const payload = {
      // tslint:disable-next-line:radix
      invoiceId: parseInt(this.unpaidInvoice.invoiceId),
      expiryDate: this.unpaidInvoice.dueDate
    };
    this.subscriptionService.markInvoiceAsPaid(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        document.getElementById('close').click();
        this.getAllSubscriptionCreated();
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
