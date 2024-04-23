import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { FinanceService } from 'src/services/data/finance/finance.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {

  searchString: string;
  p = 1;
  feeList: any;
  constructor(
    private assessmentService: AssessmentService,
    private finance: FinanceService,
    private notifyService: NotificationsService



  ) { }

  ngOnInit() {
    this.getALLCreatedFees();
  }


  getALLCreatedFees() {
    this.finance.getAllFees().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.feeList = data.payload;
      }
  }, error => {
    this.notifyService.publishMessages(error.message, 'danger', 1);
  });
  }

  getPage(page: number) {
    // // (page);
    // this.parentService.getAllParents(page, this.itemsPerPage).subscribe((data: any) => {
    //   if (data.hasErrors === false) {
    //     // (data);
    //     this.parentList = data.payload;
    //     this.parentCount = data.totalCount;
    //   }
    // },
    //   error => {
    //     this.notifyService.publishMessages(error.message, 'danger', 1);
    //   });

  }

}
