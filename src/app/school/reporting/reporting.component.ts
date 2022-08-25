import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  reportingOptions = [
    {id: 1, title: 'User profile', slug: 'userReport', data : [
      {id: 1, title: 'Export Student Profile'},
      {id: 2, title: 'Export Teacher Profile'},
      {id: 3, title: 'Export Non Teaching Staff profile'},
      {id: 4, title: 'Parent Profile'},

    ]},
    {id: 3, title: 'Student Report', slug: 'studentReport', data: [
      {id: 1, title: 'Daily Student Attendance'},
      {id: 2, title: 'Weekly Student Attendance'},
      {id: 3, title: 'Term Student Attendance'},
      {id: 4, title: 'Session Student Attendance'},

    ]},
    {id: 3, title: 'Library Report', slug: 'libraryReport', data: [
      {id: 1, title: 'Borrowed Book List'},
      {id: 2, title: 'Borrowed Overdue List'},

    ]},
    {id: 3, title: 'Finance Report', slug: 'financeReport', data: [
      {id: 1, title: 'Journal Listing / Transactions'},
      {id: 1, title: 'Monthly Depreciating Report'},
      {id: 1, title: 'Annual Depreciating Report'},
      {id: 1, title: 'Trial Balance'},
      {id: 1, title: 'Profit & Loss Statement  '},
      {id: 1, title: 'Balance Sheet  '},
      {id: 1, title: 'Cash Book  '},
      {id: 1, title: 'Vendor Line item Report  '},
      {id: 1, title: 'Receivable Line item Report  '},
      {id: 1, title: 'Asset Report  '},
      {id: 1, title: 'Witholding Tax Report  '},
      {id: 1, title: 'Inventory Report  '},
      {id: 1, title: 'Parent Line item Report  '},
      {id: 1, title: 'Spend Report  '},
      {id: 1, title: 'Budget / Project Stewardship Report  '},
      {id: 1, title: 'Project Line item Report  '}
    ]},
  ]


  studentReport = [
  ]
  financeReport: [
    {id: 1, title: 'Payment'},
    {id: 1, title: 'Subscriptions'}
  ]
  selectedReportType: any;
  showNext = false;
  constructor() { }

  ngOnInit() {
  }

  getReportType(event) {
    this.reportingOptions.forEach(item => {
      if (item.slug === event) {

        this.selectedReportType = item.data;
      }
    })
    this.showNext = true;
  }

}
