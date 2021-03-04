import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FinanceService } from 'src/services/data/finance/finance.service';
@Component({
  selector: 'app-fee-type',
  templateUrl: './fee-type.component.html',
  styleUrls: ['./fee-type.component.css']
})
export class FeeTypeComponent implements OnInit {
  searchString: string;
  p = 1;
  toggleState = false;
  feeGroupForm: FormGroup;
  feeGroupList: any;
  constructor(
    private fb: FormBuilder,
    private finance: FinanceService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.populatekFeeGroupForm();
    this.getAllFeeGroups();
  }

  
  populatekFeeGroupForm() {
    this.feeGroupForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isActive: false
    });
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }


  createFeegroup() {
    const {name, description, isActive} = this.feeGroupForm.value;
    const result = {
      name,
      description,
      isActive: this.toggleState
    };

    this.finance.createFeeGroup(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.notifyService.publishMessages('Fee Group created successfully', 'success', 1);
        document.getElementById('CloseFeeGroupModal').click();
        this.feeGroupForm.reset();
        this.getAllFeeGroups();
      }
    }, error => {
      this.notifyService.publishMessages('Fee group creation failed', 'danger', 1);

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

}
