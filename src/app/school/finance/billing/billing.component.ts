import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { FinanceService } from 'src/services/data/finance/finance.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
// import * as html2pdf from 'h'

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit, OnDestroy {
  normal = true;
  invoiceTab = false;
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
  activateBtn = false;
  TransactionId: any;
  pendingInvoicesList: any;
  allPendingPaymentHistory: any;
  fileName: any;
  fileString: any;
  studentInvoicePreview: any;
  invData: any;
  subTotal: number;
  invoiceAmount = [];
  bulkInvoiceList = [];
  schoolLogo: any;
  p = 1;
  itemsPerPage = 10;
  invoiceCount: number;

  private ngUnsubscribe = new Subject();

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
    this.getCurretSession();
    this.getAllPaymentInvoices();
    this.getPaymentAwwaitingApproval();
    // this.getSession();
    // this.getAllInvoiceCreated();
    // this.getPendingPayments();
    // this.getPaymentHistory();

    this.schoolLogo = sessionStorage.getItem('prop');
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

  showTab(status: string) {
    const newStatus = status;
    switch (newStatus) {

      case 'payment':
        this.normal = true;
        this.invoiceTab = false;
        break;

      case 'history':
        this.normal = true;
        this.invoiceTab = false;
        this.getPaymentHistory();
        break;

      case 'invoiceTab':
        this.normal = false;
        this.invoiceTab = true;
        this.getAllInvoiceCreated();
        break;

      case 'pending':
        this.normal = true;
        this.invoiceTab = false;
        this.getPendingPayments();
        break;

      default:
        this.normal = true;
    }
  }

  getCurretSession() {
    this.assessmentService.getCurrentSession()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
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
    this.assessmentService.getSchoolSessions()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessionList = data.payload;
        // console.log(this.terms);
      }
    });
  }

  getAllSections() {
    this.schoolSectionService.getSection()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }

  getClassBySectionId(id) {
    this.classService.getClassBySection(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classes = data.payload;

      }
    });

  }

  getAllFeeGroups() {
    this.finance.getAllFeeGroup()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
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
    const { ClassId, FeegroupId, session, term, paymentDate } = this.invoiceForm.value;
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
    this.finance.getAllCretedInvoicesWithPagination(this.p, this.itemsPerPage)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.invoiceList = data.payload;
        this.invoiceCount = data.totalCount;
        // this.getAllComponent();
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }

  getPage(page: number) {
    console.log(page);
    this.finance.getAllCretedInvoicesWithPagination(page, this.itemsPerPage)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.invoiceList = data.payload;
        // // this.studentList = data.payload.reverse();
        // console.log(this.studentList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }


  selectAllBoxes(e) {
    const allBoxes: any = document.getElementsByName('boxes');
    if (e.target.checked === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < allBoxes.length; index++) {
        if (allBoxes[index].type === 'checkbox') {
          this.activateBtn = true;
          allBoxes[index].checked = true;
          this.bulkInvoiceList = this.invoiceList;
        }
      }
    } else {
      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < allBoxes.length; index++) {
        if (allBoxes[index].type === 'checkbox') {
          this.activateBtn = false;

          allBoxes[index].checked = false;
          this.bulkInvoiceList = [];
        }
      }

    }
  }

  removeFromBulkList(event, id) {
    console.log(id);
    if (event.target.checked === false) {
      console.log(this.bulkInvoiceList[id]);
      const index = this.bulkInvoiceList.indexOf(id);
      console.log(index);
      if (index > -1) {
        this.bulkInvoiceList.splice(index, 1);
      }
      // console.log(this.bulkInvoiceList);
    }
  }


  getInvoiceByID(id) {
    this.finance.getInvoicesById(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        // this.getAllComponent();
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }

  previewInvoice(id) {
    this.finance.getInvoicesById(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        this.studentInvoicePreview = data.payload;
        this.invData = this.studentInvoicePreview.invoiceItems;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.invData.length; i++) {
          this.invoiceAmount.push(this.invData[i].amount);
          this.subTotal = this.invoiceAmount.reduce((a, b) => a + b, 0);
        }
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }

  getAllPaymentInvoices() {
    this.finance.getAllTransactions()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
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
    this.finance.getInvoicePaymentHistory()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPaymentHistoryList = data.payload;
        // console.log(data.payload);
        // this.getAllComponent();
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }


  getPendingPayments() {
    this.finance.getPendingInvoicePayment()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPendingPaymentHistory = data.payload;
        // console.log(data.payload);
        // this.getAllComponent();
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }

  getPaymentAwwaitingApproval() {
    this.finance.getAllTransactionsAwaitingApproval()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPendingPaymentList = data.payload;
        // console.log(data.payload);
        // this.getAllComponent();
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }

  getTransactionDetails(id) {
    this.finance.getTransactionBYId(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        // this.allPendingPaymentList = data.payload;
        this.TransactionId = data.payload.transactionId;
        // console.log(data.payload);
        this.acceptRejectForm.patchValue({
          transactionId: data.payload.transactionNumber,
          invoice: data.payload.invoiceNumber,
          paymentReference: data.payload.paymentReference,
          paymentChannel: data.payload.paymentChannel,
          description: data.payload.description,
        });
        this.fileName = data.payload.fileId;
        // this.getAllComponent();
      }
    }, error => {
      this.notifyService.publishMessages(error.message, 'danger', 1);
    });
  }


  downloadProofOfpayment(id) {
    this.finance.getFiles(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.fileString = data.payload;
        this.convertBase64ToExcel();
        // const downloadLink = document.createElement('a');
        // downloadLink.href = window.URL.createObjectURL(new Blob([data.payload], {type: 'application/pdf'}));
        // downloadLink.setAttribute('download', 'Payment Proof');
        // document.body.appendChild(downloadLink);
        // downloadLink.click();
      }
    });
  }

  convertBase64ToExcel() {

    const contentType = 'application/pdf';
    const blob1 = this.b64toBlob(this.fileString, contentType, 512);
    const blobUrl1 = URL.createObjectURL(blob1);

    window.open(blobUrl1);

  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || 'application/pdf';
    sliceSize = sliceSize || 512;

    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  rejectTransanction(status) {
    this.reject = true;
    this.approve = false;
    this.reject2 = true;
    console.log(status);
  }

  sendRejection() {
    const { Comment } = this.acceptRejectForm.value;
    const result = {
      transactionId: parseInt(this.TransactionId),
      approve: false,
      comment: Comment
    };
    console.log(result);
    this.finance.ApproveRejectTransactionReceipt(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
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
      if (data.hasErrors === false) {
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

  print() {
    const data = document.getElementById('invoice');
    html2canvas(data).then(canvas => {

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = imageWidth / imageHeight >= pageWidth / pageHeight ? pageWidth / imageWidth : pageHeight / imageHeight;
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imageWidth * ratio, imageHeight * ratio);
      pdf.save(`Invoice ${this.studentInvoicePreview.invoiceNumber}.pdf`); // Generated PDF
    });


  }

  multPrintPDF() {
    const element = document.getElementById('element-to-print');
    const opt = {
      margin: 1,
      filename: 'Invoices.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    const pages = document.getElementsByClassName('toPdfPage');
    let worker = html2pdf().set(opt).from(pages[0]).toPdf();
    for (let i = 0; i < pages.length; i++) {
      worker = worker.set(opt).from(pages[i]).toContainer().toCanvas().toPdf().get('pdf').then((pdf) => {
        if (i < pages.length - 1) { // Bump cursor ahead to new page until on last page
          pdf.addPage();
        }
        pdf.save();
      });


    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

}
