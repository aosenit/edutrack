import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { PromotionService } from 'src/services/data/promotion/promotion.service';

@Component({
  selector: 'app-class-repeat',
  templateUrl: './class-repeat.component.html',
  styleUrls: ['./class-repeat.component.css']
})
export class ClassRepeatComponent implements OnInit {
  previous = true;
  continue = false;
  promoteOntrialForm: FormGroup;
  withdrawalForm: FormGroup;
  repeatList: any;
  constructor(
    private fb: FormBuilder,
    private promotionService: PromotionService,
    private notificationService: NotificationsService

  ) { }

  ngOnInit() {
    this.initPromoteOntrialForm();
    this.initWithdrawalForm();
    this.getRepeatList();

  }

  initPromoteOntrialForm() {
    this.promoteOntrialForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  initWithdrawalForm() {
    this.withdrawalForm = this.fb.group({
      reason: ['', Validators.required]
    });
  }

  getRepeatList() {
    this.promotionService.getRepeatersList(2).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.repeatList = res.payload;
      } else {
        this.notificationService.publishMessages(res.errors, 'danger', 1);
      }
    });
  }

}

