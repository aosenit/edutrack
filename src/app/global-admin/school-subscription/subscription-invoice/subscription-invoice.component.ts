import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SubscriptionsService } from 'src/services/data/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscription-invoice',
  templateUrl: './subscription-invoice.component.html',
  styleUrls: ['./subscription-invoice.component.css']
})
export class SubscriptionInvoiceComponent implements OnInit {
subscriptionInvoiceForm: FormGroup;
  schoolId: any;
  constructor(
    private fb: FormBuilder,
    private subscriptionServie: SubscriptionsService,
    private notifyService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.schoolId = this.route.snapshot.params.id;
    this.getNextInvoice();
    this.initiateInvoiceForm();
  }

  initiateInvoiceForm() {
    this.subscriptionInvoiceForm = this.fb.group({
      endDate: ['', Validators.required],
      price: ['', Validators.required],
      studentCount: ['', Validators.required],
      school: ['', Validators.required],
      schoolId: ['']
    });
  }

  getNextInvoice() {
    this.subscriptionServie.getNextSubscriptions(this.schoolId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res.payload);
        this.patchData(res.payload);
      }
    });
  }

  patchData(payload) {
    this.subscriptionInvoiceForm.patchValue({
      endDate: moment(payload.dueDate).format('YYYY-MM-DD'),
      price: payload.amountPerStudent,
      studentCount: payload.numberOfStudent,
      school: payload.schoolName,
      schoolId: payload.schoolId,
    });
  }


  createSubscriptionInvoice() {
    const {endDate, price, studentCount, school, schoolId} = this.subscriptionInvoiceForm.value;
    const result = {
      dueDate: endDate,
      amountPerStudent: price,
      numberOfStudent: parseInt(studentCount),
      schoolId,
      schoolName: school
    };
    console.log(result);
    this.subscriptionServie.createNextSubscription(result).subscribe((res: any) => {
      if (res.hasErrors === false ) {
        console.log(res.payload);
        this.notifyService.publishMessages(res.description, 'success', 1);
        this.router.navigateByUrl('/admin/subscription');
      }
    });

  }

  back() {
    window.history.back();
  }

  allowNumbersOnly(e) {
    const ev = e || window.event;
    const charcode = ev.which ? ev.which : ev.keycode;
    if (charcode > 31 && (charcode < 48 || charcode > 57) && charcode !== 46) {
      e.preventDefault();
      return false;
    }
    return true;
  }

}
