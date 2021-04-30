import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';


@Component({
  selector: 'app-view-billing',
  templateUrl: './view-billing.component.html',
  styleUrls: ['./view-billing.component.css']
})
export class ViewBillingComponent implements OnInit {
  createTransactionForm: FormGroup;
  wardDetail: any;
  id: any;
  parentInvoice: any;
  subTotal: any;
  invoiceAmount = [];
  invArray = [];
  invData: any;
  balanceTransactionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private parent: ParentsService,
    private route: ActivatedRoute,
    private notifyService: NotificationsService,
    private router: Router

  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.wardDetail = JSON.parse(sessionStorage.getItem('ward'));

    this.populatetransactionForm();
    this.populateoutstandingtransactionForm();
    this.getinvoice();

  }

  populatetransactionForm() {
    this.createTransactionForm = this.fb.group({
      totalAmount: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  populateoutstandingtransactionForm() {
    this.balanceTransactionForm = this.fb.group({
      outstanding: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  getinvoice() {
    this.parent.getInvoicesById(this.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.parentInvoice = data.payload;
        console.log(this.parentInvoice.invoiceItems);
        this.invData = this.parentInvoice.invoiceItems;

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.invData.length; i++) {
          const item = {
            componentId: this.invData[i].id,
            isSelected: this.invData[i].isCompulsory
          };
          this.invArray.push(item);
          if (this.invData[i].isCompulsory === true) {
            this.invoiceAmount.push(this.invData[i].amount);
            this.subTotal = this.invoiceAmount.reduce((a, b) => a + b, 0);
          }
        }
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }





  calculateSubTotal(figure) {
    // const arr = [];
    // arr.push(figure);
    // this.subTotal = arr.reduce((a, b) => a + b, 0);

    // return figure;
  }


  prefilData() {
    if (this.parentInvoice.outstanding === this.parentInvoice.totalPayable) {

      this.createTransactionForm.patchValue({
        totalAmount: this.subTotal,
        description: this.parentInvoice.feeGroup
      });
    } else {
      this.balanceTransactionForm.patchValue({
        outstanding: this.parentInvoice.outstanding,
        description: this.parentInvoice.feeGroup
      });
    }
  }


  checkInvoice(event, i, id) {
    if (event.target.checked === true) {
      this.subTotal += this.invData[i].amount;
      console.log(i);
      this.invArray[i].isSelected = true;
      console.log(this.invArray);

    } else {

      this.subTotal -= this.invData[i].amount;
      this.invArray[i].isSelected = false;
      console.log(this.invArray);
      }

  }

 

  createTransaction() {
    const result = {
      invoiceId: parseInt(this.id),
      componentSelections: this.invArray
    };
    console.log(result);
    this.parent.updateSelectedInvoice(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        document.getElementById('closeAssignmentModal').click();
        this.createNewtransaction();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }


  createNewtransaction() {
    console.log(this.createTransactionForm.value);
    const { amount, description } = this.createTransactionForm.value;
    const result = {
      invoiceId: parseInt(this.id),
      amount,
      description
    };
    this.parent.createNewTransaction(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Payment Successful', 'success', 1);
        // document.getElementById('closeAssignmentModal').click();
        this.router.navigateByUrl('/parent/parent-portal/billing');

      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  createTransaction2() {
    console.log(this.balanceTransactionForm.value);
    const { amount, description } = this.balanceTransactionForm.value;
    const result = {
      invoiceId: parseInt(this.id),
      amount,
      description
    };
    this.parent.createNewTransaction(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Payment Successful', 'success', 1);
        document.getElementById('closeOutstandingModal').click();
        this.router.navigateByUrl('/parent/parent-portal/billing');
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  createTransaction3() {
    // console.log(this.createTransactionForm.value);
    const { amount, description } = this.createTransactionForm.value;
    const result = {
      invoiceId: parseInt(this.id),
      amount,
      description
    };
    this.parent.createNewTransaction(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.notifyService.publishMessages('Payment Successful', 'success', 1);
        document.getElementById('closeRejectedtrasactionModal').click();
        this.router.navigateByUrl('/parent/parent-portal/billing');
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }



  back() {
    window.history.back();
  }

}
