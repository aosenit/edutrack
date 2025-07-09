import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  selectedIndex: number | null = null;
  previousCheckedState: boolean = false;

  constructor(
    private subscriptionService: SubscriptionsService,
    private notifyService: NotificationsService,
    private cdr: ChangeDetectorRef,
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

confirmToPay(checked: boolean, index: number): void {
  this.selectMarkedInvoice = this.unpaidInvoice[index];
  this.selectedInvoice = this.unpaidInvoice[index];
  this.selectedIndex = index;
  this.previousCheckedState = !checked; // this is what it was *before* toggle

  if (checked === true) {
    document.getElementById('popupBtn').click();
  }
}

  previewInvoice(i: number) {
    this.selectedInvoice = this.unpaidInvoice[i];
  }

  markPaid() {
    const payload = {
      invoiceId: parseInt(this.selectMarkedInvoice.invoiceId),
      expiryDate: this.selectMarkedInvoice.dueDate
    };

    this.subscriptionService.markInvoiceAsPaid(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        document.getElementById('close').click();
        this.getAllSubscriptionCreated();
        this.notifyService.publishMessages(res.description, 'success', 1);
      } else {
        this.notifyService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

  onCancel(): void {
    if (this.selectedIndex !== null) {
      this.unpaidInvoice[this.selectedIndex].paid = this.previousCheckedState;
      this.selectedIndex = null;
      this.previousCheckedState = false;
    }
  }

  back() {
    window.history.back();
  }

}
