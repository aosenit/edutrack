import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/services/data/reporting/reporting.service';


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

  reportingOptions = [
    {id: 1, title: 'Invoice Report', slug: 'invoiceReport', data: [
      {id: 1, title: 'Paid Report', subSlug: 'paidReport'},
      {id: 2, title: 'Unpaid Report', subSlug: 'unpaidReport'}
    ]},

    {id: 2, title: 'Finance Report', slug: 'financeReport', data : [
        {id: 1, title: 'Payment'},
        {id: 1, title: 'Subscriptions'}
    ]},
  ];

  // userReport = [
  //     {id: 1, title: 'Total users', subslug: 'totalUsers'},
  //     // {id: 2, title: 'Total Teachers Report', subslug: 'totalTeacherReport'},
  //     // {id: 3, title: 'Total Non Teaching Staffs Report', subslug: 'totalStaffReport'},
  //     // {id: 4, title: 'Total Parents Report', subslug: 'totalParentReport'},

  // ]
  // schoolReport = [
  //   {id: 1, title: 'Daily Student Attendance'},
  //   {id: 2, title: 'Weekly Student Attendance'},
  //   {id: 3, title: 'Tern Student Attendance'},
  //   {id: 4, title: 'Session Student Attendance'},
  // ]
  // studentReport = [
  //   {id: 1, title: 'Daily Student Attendance'},
  //   {id: 2, title: 'Weekly Student Attendance'},
  //   {id: 3, title: 'Tern Student Attendance'},
  //   {id: 4, title: 'Session Student Attendance'},
  // ]
  financeReport: [
    {id: 1, title: 'Payment'},
    {id: 1, title: 'Subscriptions'}
  ];
  selectedSlug: string;
  selectedReportType: any;
  showTypes: boolean;
  selectedSubReport: any;
  showNext: boolean;
  invoiceList: any;
  unpaidInvoiceList: any;
  showExportBtn: boolean;
  subSlug: boolean;
  constructor( private reportingservice: ReportingService) { }

  ngOnInit() {

  }


  getReportType(event) {
    this.reportingOptions.forEach(item => {
      if (item.slug === event) {
        this.selectedSlug = item.slug;
        this.selectedReportType = item.data;
        this.showTypes = true;
      }
    });
  }
  selectReportType(event) {
    this.selectedSubReport = event;
    if (this.selectedSlug === 'invoiceReport') {
        this.showNext = false;
        this.showExportBtn = true;

        event === 'paidReport' ? (this.subSlug = true, this.getAllSchoolInvoiceReport(1)) :
        event === 'unpaidReport' ? (this.subSlug = true, this.getAllSchoolInvoiceReport(2))
        : this.subSlug = false;
      } else if (this.selectedSlug === 'financeReport') {
        this.showNext = true;

      }
}


getAllSchoolInvoiceReport(invoiceStatus) {
  this.reportingservice.getSchoolInvoiceReportView(invoiceStatus).subscribe((data: any) => {
    if (data.hasErrors === false) {
      this.invoiceList = data.payload;
      console.log(this.invoiceList);
    }
  });
}
downloadReport() {
  this.selectedSubReport === 'paidReport' ? this.downloadPaidInvoiceRecord() :

  this.downloadUnpaidInvoiceRecord();
}
downloadPaidInvoiceRecord() {
  this.reportingservice.exportInvoiceReportExcel(1).subscribe((res: any) => {
    if (res.hasErrors === false) {
      const link = document.createElement('a');
      link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
      link.href = 'data:image/png;base64,' + res.payload.base64String;
      link.click();
    }
  });
}

downloadUnpaidInvoiceRecord() {
  this.reportingservice.exportInvoiceReportExcel(2).subscribe((res: any) => {
    if (res.hasErrors === false) {
      const link = document.createElement('a');
      link.download = `${res.payload.fileName} Report as at ${new Date().toLocaleString()}.xlsx`;
      link.href = 'data:image/png;base64,' + res.payload.base64String;
      link.click();
    }
  });
}


}
