import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { SubscriptionsService } from 'src/services/data/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscription-lists',
  templateUrl: './subscription-lists.component.html',
  styleUrls: ['./subscription-lists.component.css']
})
export class SubscriptionListsComponent implements OnInit {
  subscriptionList: any;

  constructor(
    private subscriptionService: SubscriptionsService,
    private schoolServie: SchoolService,
    private notifyService: NotificationsService
    ) { }

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

  ActivateDeactivate(event, schoolId) {
    if (event === true) {
      console.log('Activate school', event);
      this.schoolServie.activateSchool(schoolId).subscribe((res: any) => {
        if (res.hasErrors === false ) {
          console.log(res.payload);
          this.notifyService.publishMessages(res.description, 'success', 1);
          this.getAllSubscriptionCreated();
        } else {
          this.notifyService.publishMessages(res.errors, 'danger', 1);

        }
      });
    } else {
      console.log('Deactivate school', event, schoolId);
      this.schoolServie.deactivateSchool(schoolId).subscribe((res: any) => {
        if (res.hasErrors === false ) {
          console.log(res.payload);
          this.notifyService.publishMessages(res.description, 'success', 1);
          this.getAllSubscriptionCreated();
        } else {
          this.notifyService.publishMessages(res.errors, 'danger', 1);

        }
      });
    }
  }


  markAsPaid(index) {
    const selectedSchool = this.subscriptionList[index];
    console.log(selectedSchool);
  }

}
