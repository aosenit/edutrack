import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrls: ['./withdrawal-list.component.css']
})
export class WithdrawalListComponent implements OnInit {
previous = true;
continue = false;
withdrawalForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initWithdrawalForm();
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

}
