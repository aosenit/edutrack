import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  uploadAssignmentForm: FormGroup;
  assignmentFile: any;

  constructor(
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    this.populateAssignmentForm();

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

  submitReceipt() {

  }

}
