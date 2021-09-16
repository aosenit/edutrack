import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { PromotionService } from 'src/services/data/promotion/promotion.service';
@Component({
  selector: 'app-withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrls: ['./withdrawal-list.component.css']
})
export class WithdrawalListComponent implements OnInit {
  previous = true;
  continue = false;
  withdrawalForm: FormGroup;
  withdrawalList: any;
  constructor(
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {
    this.initWithdrawalForm();
    this.getWithdrwalList();
  }

  initWithdrawalForm() {
    this.withdrawalForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }
  next(e) {
    if (e === 'yes') {
      this.previous = false;
      this.continue = true;
    }
  }

  getWithdrwalList() {
    this.promotionService.getWithDrawnList(2).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.withdrawalList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

}
