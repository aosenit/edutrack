import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {

  searchString: string;
  p = 1;
  constructor() { }

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
