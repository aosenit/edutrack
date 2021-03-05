import { Component, OnInit } from '@angular/core';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FinanceService } from 'src/services/data/finance/finance.service';

@Component({
  selector: 'app-fee-component',
  templateUrl: './fee-component.component.html',
  styleUrls: ['./fee-component.component.css']
})
export class FeeComponentComponent implements OnInit {
  toggleState = false;
  searchString: string;
  p = 1;
  termList: any;
  terms = [];
  componentForm: FormGroup;
  sequenceCount = 0;
  bankAccountList: any;
  components: any;


  constructor(
    private assessmentService: AssessmentService,
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService

  ) { }

  ngOnInit() {
    this.getSession();
    this.populateComponentForm();
    this.getChartOfAccount();
    this.getAllComponent();
  }

  populateComponentForm() {
    this.componentForm = this.fb.group({
      AccountId: ['', Validators.required],
      name: ['', Validators.required],
      terms: ['', Validators.required],
      isActive: false
    });
  }

  getSession() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        const sessionList: any = data.payload;
        this.termList = sessionList[0].terms;
        console.log(this.terms);
      }
    });
  }

  getChartOfAccount() {
    this.finance.getAllChartOfAccount().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.bankAccountList = data.payload;
      }
    }, error => {
      this.notifyService.publishMessages('Banc Account creation failed', 'danger', 1);

    });
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }

  getTerms(e) {
      this.terms.push(e);
  }


  createnewComponent() {
    const {AccountId, name, terms, isActive} = this.componentForm.value;
    const sequenceNumber = this.sequenceCount++;

    const term = this.terms.map((ids: any) => {
      return parseInt(ids);
    });
    const result = {
      name,
      // tslint:disable-next-line:radix
      accountId: parseInt(AccountId),
      terms: term,
      sequenceNumber,
      isActive: this.toggleState
    };
    console.log(result);
    this.finance.createNewComponent(result).subscribe((data: any) => {
        if (data.hasErrors === false) {
        this.notifyService.publishMessages('Successful', 'success', 1);
        document.getElementById('mySubjectModal').click();
        this.getAllComponent();
        }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }


  getAllComponent() {
    this.finance.getComponent().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.components = data.payload;
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }


  getPage(page: number) {
    // console.log(page);
    // this.parentService.getAllParents(page, this.itemsPerPage).subscribe((data: any) => {
    //   if (data.hasErrors === false) {
    //     console.log(data);
    //     this.parentList = data.payload;
    //     this.parentCount = data.totalCount;
    //   }
    // },
    //   error => {
    //     this.notifyService.publishMessages(error.message, 'danger', 1);
    //   });

  }
}
