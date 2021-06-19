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
  editComponentForm: FormGroup;
  componentID: any;
  checkTerm: boolean;
  sessionList: any;


  constructor(
    private assessmentService: AssessmentService,
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService

  ) { }

  ngOnInit() {
    this.getSession();
    this.populateComponentForm();
    this.populateEditComponentForm();
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

  populateEditComponentForm() {
    this.editComponentForm = this.fb.group({
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
        this.sessionList  = data.payload;
        this.termList = this.sessionList.terms;
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

  getTerms(event, sequence) {
    if (event.target.checked === true) {
      this.terms.push(event.target.value);
      console.log(this.terms)
    } else {
      const index = this.terms.indexOf(`${sequence}`);
      if (index > -1) {
        this.terms.splice(index, 1);

      }
      this.terms.filter((item) => item !== sequence);
      console.log(this.terms);
    }
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
        this.componentForm.reset();
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


  getComponent(id) {
    this.componentID = id;
    this.finance.getComponentById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        const terMs = data.payload.terms;
        const splitTerms = terMs.split(',');
        this.terms = [];
        splitTerms.forEach(v => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.sessionList.terms.length; i++) {
            console.log(this.sessionList.terms[i]);
            if (this.sessionList.terms[i].sequenceNumber == v) {
              console.log('yes');
              this.sessionList.terms[i].checked = true;
              this.terms.push(v);
              console.log(this.terms)
              // console.log(this.hobbiesArray);
              // console.log(this.allHobbyList);
              // tslint:disable-next-line:no-unused-expression

            }
          }
        });

        this.editComponentForm.patchValue({
            AccountId: data.payload.accountId,
            name: data.payload.name,
            // terms: data.payload.splitTerms,
            isActive: data.payload.isActive

        });
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  updateComponent() {
    const {AccountId, name, terms, isActive} = this.editComponentForm.value;
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
    this.finance.updateComponentById( this.componentID , result).subscribe((data: any) => {
        if (data.hasErrors === false) {
        this.notifyService.publishMessages('Successful', 'success', 1);
        document.getElementById('closeEditComponent').click();
        this.componentForm.reset();
        this.getAllComponent();
        }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }
}
