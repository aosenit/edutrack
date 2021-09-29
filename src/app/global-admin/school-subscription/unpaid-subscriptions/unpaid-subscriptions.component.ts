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
  selectedInvoice: any;
  selectMarkedInvoice: any;

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
        this.unpaidInvoice = res.payload;
      } else {
        this.notifyService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

  confirmToPay(e, i) {
    this.selectMarkedInvoice = this.unpaidInvoice[i];
    if (e === true) {
      document.getElementById('popupBtn').click();
      console.log( document.getElementById('selectionModal'))
    }
  }

  previewInvoice(i) {
    this.selectedInvoice = this.unpaidInvoice[i];
  }

  markPaid() {
    const payload = {
      // tslint:disable-next-line:radix
      invoiceId: parseInt(this.selectMarkedInvoice.invoiceId),
      expiryDate: this.selectMarkedInvoice.dueDate
    };
    this.subscriptionService.markInvoiceAsPaid(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        document.getElementById('close').click();
        this.getAllSubscriptionCreated();
        // console.log(res.payload);
        this.notifyService.publishMessages(res.description, 'success', 1);
      } else {
        this.notifyService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }

  back() {
    window.history.back();
  }





}
