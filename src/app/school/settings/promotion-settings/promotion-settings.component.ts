import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { PromotionService } from 'src/services/data/promotion/promotion.service';

@Component({
  selector: 'app-promotion-settings',
  templateUrl: './promotion-settings.component.html',
  styleUrls: ['./promotion-settings.component.css']
})
export class PromotionSettingsComponent implements OnInit {
  terminalClasses: any;
  promotionMethods: any;
  promotionTypes: any;
  promotionForm: FormGroup;
  withdrawalForm: FormGroup;

  constructor(
    private promotion: PromotionService,
    private fb: FormBuilder,
    private notification: NotificationsService
  ) { }

  ngOnInit() {
    this.promotionForm = this.fb.group({
      promotionmethod: ['', Validators.required],
      promotiontype: ['', Validators.required],
      promotionscore: ['', Validators.required],
    });
    this.withdrawalForm = this.fb.group({
      maxrepeat: ['', Validators.required]
    });

    this.getPromotionSetups();
    this.getPromotionMethods();
    this.getPromotionTypes();

  }


  getTerminalClass() {
    this.promotion.getAllTerminalClasses().subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res.payload);
        this.terminalClasses = res.payload;
      }
    });
  }

  getPromotionSetups() {
    this.promotion.getPromotionSetup().subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res.payload);
        this.terminalClasses = res.payload;
      }
    });
  }

  getPromotionMethods() {
    this.promotion.getPromotionMethod().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.promotionMethods = res;
      }
    });
  }
  getPromotionTypes() {
    this.promotion.getPromotionType().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.promotionTypes = res;
      }
    });
  }

  getWithdrawalSetups() {
    this.promotion.getWithdrawalSetup().subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res.payload);
        this.terminalClasses = res.payload;
      }
    });
  }

  creationPromotionSetup() {
    const {promotionmethod, promotiontype, promotionscore} = this.promotionForm.value;
    const payload = {
      promotionMethod: parseInt(promotionmethod),
      // tslint:disable-next-line:radix
      promotionType: parseInt(promotiontype),
      promotionScore: parseInt(promotionscore)
    };

    this.promotion.updatePromotionSetup(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res);
        this.notification.publishMessages(res.description, 'success', 1);
        this.promotionForm.reset();
        this.getPromotionSetups();
      }
    });
  }
  

  createWithdrawalMethod() {
    const {maxrepeat} = this.withdrawalForm.value;
    
    const payload = {
      // tslint:disable-next-line:radix
      maxRepeat : parseInt(maxrepeat)
    };
    
    this.promotion.updateWithdrawalSetup(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notification.publishMessages(res.description, 'success', 1);
        this.withdrawalForm.reset();
        this.getWithdrawalSetups();

      }
    })

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

  dragRow(e, index) {
    e.preventDefault();
    console.log(e, index);
  }


  sortOrder(e) {
    e.preventDefault();
    console.log(e);

  }
  lastBustop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    console.log('e, e', data, e);

  }
}
