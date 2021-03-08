import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { parse } from 'querystring';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FinanceService } from 'src/services/data/finance/finance.service';

@Component({
  selector: 'app-new-account-chart',
  templateUrl: './new-account-chart.component.html',
  styleUrls: ['./new-account-chart.component.css']
})
export class NewAccountChartComponent implements OnInit {
  toggleState = false;
  chartAccountForm: any;
  accountTypeList: any;
  accountClassList: any;

  constructor(
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.populateChartOFAccountForm();
    this.getAccountClasses();
    
  }

  populateChartOFAccountForm() {
    this.chartAccountForm = this.fb.group({
      AccountTypeId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      AccountNumber: ['', [Validators.required, Validators.minLength(1)]],
      OpeningBalance: ['', Validators.required],
      cashPostable: false,
      isActive: false
    });
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }

  back() {
    window.history.back();
  }

  getAccountTypes() {
    this.finance.getAllAccountType().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.accountTypeList = data.payload;
        // this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Account type creation failed', 'danger', 1);

    });
  }

  getAccountClasses() {
    this.finance.getAllAccountClass().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.accountClassList = data.payload;
        // this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Account type creation failed', 'danger', 1);

    });
  }

  getAccountTypesfromClass( id) {
    this.finance.getAccountTypesByAccountClass(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.accountTypeList = data.payload;
        // this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Account type creation failed', 'danger', 1);

    });
  }

  createChartOfAccount() {
    const {AccountNumber, AccountTypeId, cashPostable, description, isActive, name, OpeningBalance  } = this.chartAccountForm.value;
    const result = {
      // tslint:disable-next-line:radix
      accountNumber: parseInt(AccountNumber),
      // tslint:disable-next-line:radix
      accountTypeId: parseInt(AccountTypeId),
      cashPostable: 0,
      description,
      isActive: this.toggleState,
      name,
      // tslint:disable-next-line:radix
      openingBalance: parseInt(OpeningBalance)
    };

    this.finance.createNewChartAccount(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.notifyService.publishMessages('Account created successfully', 'success', 1);
        this.router.navigateByUrl('/school/finance-setting/chart-of-account');
        // this.getAllAccountClass();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages('Bank Account creation failed', 'danger', 1);

    });
  }

}
