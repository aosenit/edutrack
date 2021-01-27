import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fee-component',
  templateUrl: './fee-component.component.html',
  styleUrls: ['./fee-component.component.css']
})
export class FeeComponentComponent implements OnInit {
  toggleState = false;
  searchString: string;
  p = 1;


  constructor() { }

  ngOnInit() {
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

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
