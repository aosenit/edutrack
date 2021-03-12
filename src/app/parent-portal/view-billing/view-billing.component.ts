import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ParentsService } from 'src/services/data/parents/parents.service';


@Component({
  selector: 'app-view-billing',
  templateUrl: './view-billing.component.html',
  styleUrls: ['./view-billing.component.css']
})
export class ViewBillingComponent implements OnInit {
  createTransactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parent: ParentsService

  ) { }

  ngOnInit() {
    this.populatetransactionForm();

  }

  populatetransactionForm() {
    this.createTransactionForm = this.fb.group({
      totalAmount: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  createTransaction() {
    console.log(this.createTransactionForm.value)
  }


 createNewtransaction() {
  //  this.parent.cre
 }

  back() {
    window.history.back();
  }

}
