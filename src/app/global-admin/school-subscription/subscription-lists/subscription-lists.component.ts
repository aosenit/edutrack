import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from 'src/services/data/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscription-lists',
  templateUrl: './subscription-lists.component.html',
  styleUrls: ['./subscription-lists.component.css']
})
export class SubscriptionListsComponent implements OnInit {
  subscriptionList: any;

  constructor(private subscriptionService: SubscriptionsService) { }

  ngOnInit() {
    this.getAllSubscriptionCreated();
  }

  getAllSubscriptionCreated() {
    this.subscriptionService.getAllSubscriptions().subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log('ds', res.payload);
        this.subscriptionList = res.payload;
      }
    });
  }

  ActivateDeactivate(event) {
    if (event === true) {
      console.log('Activate school', event);
    } else {
      console.log('Deactivate school', event);

    }
  }

}
