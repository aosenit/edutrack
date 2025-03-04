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
  editAccountClassForm: FormGroup;
  editAccountTypeForm: FormGroup;
  selectedAccountType: any;
  selectedAccountClass: any;

  constructor(
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.populatekAccountForm();
    this.getAllAccountClass();
    this.populateAccountTypeForm();
    // this.getAccountTypes();
    this.populateEditAccountForm();
    this.populateEditAccountTypeForm();
  }

  populatekAccountForm() {
    this.accountClassForm = this.fb.group({
      name: ['', Validators.required],
      minNumberValue: ['', Validators.required],
      maxNumberValue: ['', Validators.required],
      isActive: false
    });
  }

  populateEditAccountForm() {
    this.editAccountClassForm = this.fb.group({
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

  populateEditAccountTypeForm() {
    this.editAccountTypeForm = this.fb.group({
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
        this.getAllAccountClass();
        break;


      case 'type':
        this.class = false;
        this.type = true;
        this.getAccountTypes();
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
    // // ('sdsd');
    const {name, minNumberValue, maxNumberValue, isActive} = this.accountClassForm.value;
    const result = {
      name,
      minNumberValue,
      maxNumberValue,
      isActive: this.toggleState
    };

    // // ('bank account', result);
    this.finance.createNewAccountClass(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.notifyService.publishMessages('Account created successfully', 'success', 1);
        document.getElementById('CloseaccountClass').click();
        this.accountClassForm.reset();
        this.getAllAccountClass();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

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
      // this.notifyService.publishMessages('Banc Account creation failed', 'danger', 1);

    });
  }

  editAccountClass(id) {
    this.selectedAccountClass = id;

    this.finance.getAccountClassById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {

        this.editAccountClassForm.patchValue({
          name: data.payload.name,
          minNumberValue: data.payload.minNumberValue,
          maxNumberValue: data.payload.maxNumberValue,
          isActive: data.payload.isActive
        });
      }
    }, error => {
      // this.notifyService.publishMessages('Account type creation failed', 'danger', 1);

    });

  }

  updateAccountClassData() {
    const {name, minNumberValue, maxNumberValue, isActive} = this.editAccountClassForm.value;
    const result = {
      name,
      minNumberValue,
      maxNumberValue,
      isActive: this.toggleState
    };
    this.finance.updateAccountClassById(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.notifyService.publishMessages('Account updated successfully', 'success', 1);
        document.getElementById('CloseEditaccountClass').click();
        this.accountClassForm.reset();
        this.getAllAccountClass();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages('Bank Account creation failed', 'danger', 1);

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

    // ('bank account', result);
    this.finance.createNewAccountType(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.notifyService.publishMessages('Account created successfully', 'success', 1);
        document.getElementById('CloseaccountType').click();
        this.accountTypeForm.reset();
        this.getAccountTypes();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages('Account type creation failed', 'danger', 1);

    });
  }


  getAccountTypes() {
    this.finance.getAllAccountType().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.accountTypeList = data.payload;
        // this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Failed to get account class', 'danger', 1);

    });
  }

  editAccountType(id) {
    this.selectedAccountType = id;
    this.finance.getAccountTypewithId(id).subscribe((data: any) => {
      if (data.hasErrors === false) {

        this.editAccountTypeForm.patchValue({
          name: data.payload.name,
          AccountClassId: data.payload.accountClassId,
          description: data.payload.description,
          isActive: data.payload.isActive
        });
      }
    }, error => {
      this.notifyService.publishMessages('Failed to get account', 'danger', 1);

    });
  }

  updateAccountTypeData() {
    const {name, AccountClassId, description, isActive} = this.editAccountTypeForm.value;
    const result = {
      name,
      // tslint:disable-next-line:radix
      accountClassId : parseInt(AccountClassId),
      description,
      isActive: this.toggleState
    };

    // // ('bank account', result);
    this.finance.updateAccountTypeById( this.selectedAccountType, result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.notifyService.publishMessages('Account updated successfully', 'success', 1);
        document.getElementById('CloseEditaccountType').click();
        this.accountTypeForm.reset();
        this.getAccountTypes();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages('Account type creation failed', 'danger', 1);

    });
  }

}
