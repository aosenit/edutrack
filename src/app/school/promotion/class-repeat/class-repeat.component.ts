import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initPromoteOntrialForm();
    this.initWithdrawalForm();

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
 
}

