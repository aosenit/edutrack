import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FinanceService } from 'src/services/data/finance/finance.service';


@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {

  searchString: string;
  p = 1;
  itemsPerPage = 10;
  accountCount: number;
  toggleState = false;
  bankAccountForm: FormGroup;
  bankAccountList: any;
  editBankAccountForm: FormGroup;
  selectedAccountId: any;

  constructor(
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService

  ) { }

  ngOnInit() {
    this.populateBankAccountForm();
    this.getAllBankAccounts();
    this.populateEditBankAccountForm();
  }

  populateBankAccountForm() {
    this.bankAccountForm = this.fb.group({
      bank: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      isActive: false
    });
  }
  populateEditBankAccountForm() {
    this.editBankAccountForm = this.fb.group({
      bank: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
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

  createBankAccount() {
    const { bank, accountName, accountNumber, isActive } = this.bankAccountForm.value;
    const result = {
      bank,
      accountName,
      accountNumber,
      isActive: this.toggleState
    };

    // // ('bank account', result);
    this.finance.createNewBankAccount(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        this.notifyService.publishMessages('Account created successfully', 'success', 1);
        document.getElementById('myAccountModal').click();
        this.getAllBankAccounts();
      }
      
    }, error => {
      this.notifyService.publishMessages('Bank Account creation failed', 'danger', 1);

    });
  }

  getAllBankAccounts() {
    this.finance.getAllBankAccount(this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.bankAccountList = data.payload;
        this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Bank Account creation failed', 'danger', 1);

    });
  }


  getPage(page: number) {
    // (page);
    this.finance.getAllBankAccount(page, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.bankAccountList = data.payload;
        this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages(' Account creation failed', 'danger', 1);

    });
  }

  editBankAccount(id) {
    this.selectedAccountId = id;
    this.finance.getBankAccountById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
       // (data.payload);
       this.editBankAccountForm.patchValue({
         bank: data.payload.bank,
         accountName: data.payload.accountName,
         accountNumber: data.payload.accountNumber,
         isActive: data.payload.isActive,
       });
      }
    }, error => {
      this.notifyService.publishMessages('Banc Account creation failed', 'danger', 1);

    });
  }

  updateBankAccount() {
    const { bank, accountName, accountNumber, isActive } = this.editBankAccountForm.value;
    const result = {
      bank,
      accountName,
      accountNumber,
      isActive: this.toggleState
    };

    // ('bank account', result);
    this.finance.updateBankAccountById(this.selectedAccountId, result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        this.notifyService.publishMessages('Account created successfully', 'success', 1);
        document.getElementById('editAccountModal').click();
        this.getAllBankAccounts();
      }
    }, error => {
      this.notifyService.publishMessages('Bank Account creation failed', 'danger', 1);

    });
  }
}
