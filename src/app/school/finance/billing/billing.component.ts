import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { FinanceService } from 'src/services/data/finance/finance.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  normal = true;
  type = false;
  invoiceForm: FormGroup;
  termList: any;
  classes: any;
  sections: any;
  feeGroupList: any;
  sessionList: any;
  sessionId: any;
  invoiceList: any;
  allPaymentList: any;
  allPaymentHistoryList: any;
  allPendingPaymentList: any;
  acceptRejectForm: FormGroup;
  reject = false;
  approve = true;
  reject2 = false;
  TransactionId: any;
  pendingInvoicesList: any;
  constructor(
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService,
    private classService: ClassService,
    private schoolSectionService: SchoolSectionService,
    private assessmentService: AssessmentService,
  ) { }

  ngOnInit() {
    this.populateInvoiceForm();
    this.populateApproveRejectTransactionForm();
    this.getSession();
    this.getAllFeeGroups();
    this.getAllSections();
    // this.getSession();
    this.getCurretSession();
    this.getAllInvoiceCreated();
    this.getAllPaymentInvoices();
    this.getPaymentHistory();
    this.getPendingPayments();
    this.getPaymentAwwaitingApproval();
    // this.getPendingTransactions();
  }

  populateInvoiceForm() {
    this.invoiceForm = this.fb.group({
      level: ['', Validators.required],
      ClassId: ['', Validators.required],
      FeegroupId: ['', Validators.required],
      session: ['', Validators.required],
      term: ['', Validators.required],
      paymentDate: ['', Validators.required],
    });
  }


  populateApproveRejectTransactionForm() {
    this.acceptRejectForm = this.fb.group({
      transactionId: ['', Validators.required],
      invoice: ['', Validators.required],
      paymentReference: ['', Validators.required],
      paymentChannel: ['', Validators.required],
      description: ['', Validators.required],
     Comment: ['', Validators.required]
    });
  }
  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus) {

      case 'normal':
        this.normal = true;
        this.type = false;
        break;


      case 'type':
        this.normal = false;
        this.type = true;
        break;


      default:
        this.normal = true;
    }
  }

  getCurretSession() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        const sessionList: any = data.payload;
        this.termList = this.sessionList.terms;
        // console.log(this.terms);
      }
    });
  }

  getTerms(i) {
    console.log(this.sessionList[i]);
    this.sessionId = this.sessionList[i].id;
    this.termList = this.sessionList[i].terms;
  }

  getSession() {
    this.assessmentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessionList = data.payload;
        // console.log(this.terms);
      }
    });
  }

  getAllSections() {
    this.schoolSectionService.getSection().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }

  getClassBySectionId(id) {
    this.classService.getClassBySection(id).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classes = data.payload;

        }
      });

  }

  getAllFeeGroups() {
    this.finance.getAllFeeGroup().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.feeGroupList = data.payload;
        // this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Error occured', 'danger', 1);

    });
  }

  generateInvoice() {
    console.log(this.invoiceForm.value);
    const {ClassId, FeegroupId, session, term, paymentDate} = this.invoiceForm.value;
    const result = {
      classId: parseInt(ClassId),
      feeGroupId: parseInt(FeegroupId),
      termSequence: parseInt(term),
      sessionId: parseInt(this.sessionId),
      paymentDate

    };
    console.log(result);
    this.finance.generteInvoices(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
      this.notifyService.publishMessages('Successful', 'success', 1);
      document.getElementById('closeInvoiceModal').click();
      this.invoiceForm.reset();
      this.getAllInvoiceCreated();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
  }, error => {
    this.notifyService.publishMessages(error.errors, 'danger', 1);
  });
  }

  getAllInvoiceCreated() {
    this.finance.getAllCretedInvoices().subscribe((data: any) => {
      if (data.hasErrors === false) {
     console.log(data.payload);
     this.invoiceList = data.payload;
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }


  getInvoiceByID(id) {
    this.finance.getInvoicesById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
      console.log(data.payload);
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  getAllPaymentInvoices() {
    this.finance.getAllTransactions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPaymentList = data.payload;
    //  console.log(data.payload);
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }


  getPaymentHistory() {
    this.finance.getInvoicePaymentHistory().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPaymentHistoryList = data.payload;
        console.log(data.payload);
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }


  getPendingPayments() {
    this.finance.getPendingInvoicePayment().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPendingPaymentList = data.payload;
        console.log(data.payload);
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  getPaymentAwwaitingApproval() {
    this.finance.getAllTransactionsAwaitingApproval().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPendingPaymentList = data.payload;
        console.log(data.payload);
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  getTransactionDetails(id) {
    this.finance.getTransactionBYId(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // this.allPendingPaymentList = data.payload;
        this.TransactionId = data.payload.transactionId;
        console.log(data.payload);
        this.acceptRejectForm.patchValue({
          transactionId: data.payload.transactionNumber,
          invoice: data.payload.invoiceNumber,
          paymentReference: data.payload.paymentReference,
          paymentChannel: data.payload.paymentChannel,
          description: data.payload.description,
        });
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }


  rejectTransanction(status) {
    this.reject = true;
    this.approve = false;
    this.reject2 = true;
    console.log(status);
  }

  sendRejection() {
    const {Comment} = this.acceptRejectForm.value;
    const result = {
      transactionId: parseInt(this.TransactionId),
      approve: false,
      comment: Comment
    };
    console.log(result);
    this.finance.ApproveRejectTransactionReceipt(result).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        this.notifyService.publishMessages('Payment rejected', 'success', 1);
        document.getElementById('closeConfirmPaymentModal').click();
        this.getAllPaymentInvoices();
      } else {
        this.notifyService.publishMessages(data.errors, 'success', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'success', 1);

    });
  }

  approvalTransaction() {
    const result = {
      transactionId: parseInt(this.TransactionId),
      approve: true,
      comment: ''
    };
    console.log(result);
    this.finance.ApproveRejectTransactionReceipt(result).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        this.notifyService.publishMessages('Payment confirmed', 'success', 1);
        document.getElementById('closeConfirmPaymentModal').click();
        this.getAllPaymentInvoices();
      } else {
        this.notifyService.publishMessages(data.errors, 'success', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'success', 1);

    });
  }

  // getPendingTransactions() {
  //   this.finance.getPendingInvoicePayment().subscribe((data: any) => {
  //     if (data.hasErrors === false) {
  //       this.pendingInvoicesList = data.payload;
  //   //  console.log(data.payload);
  //     // this.getAllComponent();
  //     }
  // }, error => {
  //   this.notifyService.publishMessages(error.message, 'danger', 1);
  // });
  // }

}
