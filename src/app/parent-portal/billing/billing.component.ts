import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  uploadReceiptForm: FormGroup;
  assignmentFile: any;
  wardDetail: any;
  parentInvoice: any;
  allPendingPaymentList: any;
  TransactionId: any;
  allTransactionList: any;
  totalMoneyPaid = 0;
  paymentCount: any;
  fileDetails: any;
  studentInvoicePreview: any;
  invData: any;
  subTotal: number;
  invoiceAmount = [];
  schoolLogo: any;
  constructor(
    private fb: FormBuilder,
    private parent: ParentsService,
    private notifyService: NotificationsService


  ) { }

  ngOnInit() {
    this.wardDetail = JSON.parse(sessionStorage.getItem('ward'));

    this.populateAssignmentForm();
    this.getinvoice();
    this.getPaymentHistory();
    this.getTransactionHistory();


  }

  populateAssignmentForm() {
    this.uploadReceiptForm = this.fb.group({
      referenceNumber: ['', Validators.required],
      description: ['', Validators.required],
      Document: ['']
    });
  }


  handleFileUpload(event: any) {
    console.log(event);
    const upld = event.target.value.split('.').pop();
    if (upld !== 'pdf') {
      this.notifyService.publishMessages('Please upload evidence in form of pdf', 'danger', 1);
    } else {
      console.log(upld);
      const reader = new FileReader();
      if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.assignmentFile = file.name;
      this.uploadReceiptForm.get('Document').setValue(file);
      // this.iconname = this.icon.name;
    }
    }
  }

  getinvoice() {
    this.parent.getInvoices(this.wardDetail.classID, this.wardDetail.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
          this.parentInvoice = data.payload;
          console.log(this.parentInvoice);
      }
      // this.mydate = this.assignments.map((date) => {
      //   return moment(date.dueDate).fromNow();
      // });
      // console.log(test);
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getPaymentHistory() {
    this.parent.getAllPendingTransactions(this.wardDetail.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allPendingPaymentList = data.payload;
        console.log(data.payload);
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  getReceiptid(id) {
    this.TransactionId = id;
  }

  submitReceipt() {
    const {Document, referenceNumber, description  } = this.uploadReceiptForm.value;
    const result = {
      PaymentReference: referenceNumber,
      PaymentDescription: description,
      TransactionId : parseInt(this.TransactionId),
      Document
    };
    this.parent.updateTransactionReceipt(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        document.getElementById('closeReceiptModal').click();
        this.notifyService.publishMessages('Evidence uploaded successfully', 'success', 1);
        this.getinvoice();
        this.getPaymentHistory();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    });
  }


  getTransactionHistory() {
    this.parent.getTransactionPaymentHistory( this.wardDetail.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.allTransactionList = data.payload;
        this.paymentCount = this.allTransactionList.filter((status: any) => status.status === 'Paid');
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.allTransactionList.length; i++) {
            this.totalMoneyPaid += this.allTransactionList[i].amount;
          }
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  viewFile(id) {
    this.parent.getFiles(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.fileDetails = data.payload;
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    });
  }

  previewInvoice(id) {
    this.parent.getInvoicesById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
      console.log(data.payload);
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

  // tslint:disable-next-line:variable-name
addCommas(number: any) {
  const num = Number(number);
  if (isNaN(num)) {
    return number;
  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}



}
