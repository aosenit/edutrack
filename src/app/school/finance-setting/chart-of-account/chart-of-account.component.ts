import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FinanceService } from 'src/services/data/finance/finance.service';

@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css']
})
export class ChartOfAccountComponent implements OnInit {
  searchString: string;
  p = 1;
  accountList: any;
  accountCount: any;
  constructor(
    private finance: FinanceService,
    private notifyService: NotificationsService

  ) { }

  ngOnInit() {
    this.getChartOfAccounts();
  }

  getChartOfAccounts() {
    this.finance.getAllChartOfAccount().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.accountList = data.payload;
        this.accountCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages('Bank Account creation failed', 'danger', 1);

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
