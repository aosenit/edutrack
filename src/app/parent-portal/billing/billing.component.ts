import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  uploadAssignmentForm: FormGroup;
  assignmentFile: any;
  wardDetail: any;
  parentInvoice: any;

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

  }

  populateAssignmentForm() {
    this.uploadAssignmentForm = this.fb.group({
      assimentId: [''],
      Document: ['']
    });
  }


  handleFileUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.assignmentFile = file.name;
      this.uploadAssignmentForm.get('Document').setValue(file);
      // this.iconname = this.icon.name;
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
    this.parent.getAllTransactions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // this.allPaymentList = data.payload;
        console.log(data.payload);
      // this.getAllComponent();
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  submitReceipt() {

  }

}
