import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FinanceService } from 'src/services/data/finance/finance.service';

@Component({
  selector: 'app-account-panel',
  templateUrl: './account-panel.component.html',
  styleUrls: ['./account-panel.component.css']
})
export class AccountPanelComponent implements OnInit {

  class = true;
  type = false;
  toggleState = false;
  searchString: string;
  p = 1;
  itemsPerPage = 10;
  accountClassForm: FormGroup;
  accountClassList: any;
  accountTypeForm: FormGroup;
  accountTypeList: any;

  constructor(
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.populatekAccountForm();
    this.getAllAccountClass();
    this.populateAccountTypeForm();
    this.getAccountTypes();
  }

  populatekAccountForm() {
    this.accountClassForm = this.fb.group({
      name: ['', Validators.required],
      minNumberValue: ['', Validators.required],
      maxNumberValue: ['', Validators.required],
      isActive: false
    });
  }
  populateAccountTypeForm() {
    this.accountTypeForm = this.fb.group({
      AccountClassId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      isActive: false
    });
  }

  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus) {

      case 'class':
        this.class = true;
        this.type = false;
        break;


      case 'type':
        this.class = false;
        this.type = true;
        break;


      default:
        this.class = true;
    }
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }


  createAccountClassData() {
    // console.log('sdsd');
    const {name, minNumberValue, maxNumberValue, isActive} = this.accountClassForm.value;
    const result = {
      name,
      minNumberValue,
      maxNumberValue,
      isActive: this.toggleState
    };

    console.log('bank account', result);
    this.finance.createNewAccountClass(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.notifyService.publishMessages('Account created successfully', 'success', 1);
        document.getElementById('CloseaccountClass').click();
        this.accountClassForm.reset();
        this.getAllAccountClass();
      }
    }, error => {
      this.notifyService.publishMessages('Bank Account creation failed', 'danger', 1);

    });
  }

  getAllAccountClass() {
    this.finance.getAllAccountClass().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.accountClassList = data.payload;
        // this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Banc Account creation failed', 'danger', 1);

    });
  }

  createAccountTypeData() {
    const {name, AccountClassId, description, isActive} = this.accountTypeForm.value;
    const result = {
      name,
      // tslint:disable-next-line:radix
      accountClassId : parseInt(AccountClassId),
      description,
      isActive: this.toggleState
    };

    console.log('bank account', result);
    this.finance.createNewAccountType(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.notifyService.publishMessages('Account created successfully', 'success', 1);
        document.getElementById('CloseaccountType').click();
        this.accountTypeForm.reset();
        this.getAccountTypes();
      }
    }, error => {
      this.notifyService.publishMessages('Account class creation failed', 'danger', 1);

    });
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

}
