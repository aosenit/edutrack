import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
  currentPromotionSetup: any;

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

  getPromotionTypes() {
    this.promotion.getPromotionType().subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.promotionTypes = res;
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



  creationPromotionSetup() {
    const { promotionmethod, promotiontype, promotionscore } = this.promotionForm.value;
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
      } else {
        this.notification.publishMessages(res.errors, 'danger', 1);

      }
    });
  }

  getPromotionSetups() {
    this.promotion.getPromotionSetup().subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res.payload);
        this.currentPromotionSetup = res.payload;
        this.pupulatePromotionSetup(res.payload);
        // this.terminalClasses = res.payload;
      }
    });
  }

  pupulatePromotionSetup(payload) {
    this.promotionForm.patchValue({
      promotionmethod: payload.promotionMethod,
      promotiontype: payload.promotionType,
      promotionscore: payload.promotionScore
    });
  }

  getWithdrawalSetups() {
    this.promotion.getWithdrawalSetup().subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res.payload);
        this.populateWithdrawalSetup(res.payload);
      }
    });
  }


  createWithdrawalMethod() {
    const { maxrepeat } = this.withdrawalForm.value;

    const payload = {
      // tslint:disable-next-line:radix
      maxRepeat: parseInt(maxrepeat)
    };

    this.promotion.updateWithdrawalSetup(payload).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notification.publishMessages(res.description, 'success', 1);
        this.withdrawalForm.reset();
        this.getWithdrawalSetups();
      } else {
        this.notification.publishMessages(res.errors, 'danger', 1);
      }
    });

  }

  populateWithdrawalSetup(payload) {
    this.withdrawalForm.patchValue({
      maxrepeat: payload.maxRepeat
    });
  }



  getTerminalClass() {
    this.promotion.getAllTerminalClasses().subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.terminalClasses = res.payload;
      }
    });
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.terminalClasses, event.previousIndex, event.currentIndex);
    this.terminalClasses[1].sequence = event.currentIndex;
  }

  setTerminal(e, i) {
    this.terminalClasses[i].isTerminal = e;
    console.log(e, this.terminalClasses[i]);

  }

  saveArrangement() {
    this.terminalClasses.forEach((element, index) => {
      element.sequence = index + 1;
    });
    this.promotion.updateTerminalClassSetup(this.terminalClasses).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notification.publishMessages(res.description, 'success', 1);
      } else {
        this.notification.publishMessages(res.error, 'danger', 1);

      }
    });
  }

  // prepareSubmissionButton() {
  //   for (let index = 0; index < this.terminalClasses.length; index++) {
  //     if (this.terminalClasses[index].isTerminal)
      
  //   }
  // }

}
