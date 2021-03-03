import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/services/data/finance/finance.service';

@Component({
  selector: 'app-chart-of-account',
  templateUrl: './chart-of-account.component.html',
  styleUrls: ['./chart-of-account.component.css']
})
export class ChartOfAccountComponent implements OnInit {
  searchString: string;
  p = 1;
  constructor(
    private finance: FinanceService
  ) { }

  ngOnInit() {
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
