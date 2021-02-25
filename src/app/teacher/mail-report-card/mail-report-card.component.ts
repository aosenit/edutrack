import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mail-report-card',
  templateUrl: './mail-report-card.component.html',
  styleUrls: ['./mail-report-card.component.css']
})
export class MailReportCardComponent implements OnInit {
  boxChecked = false;
  constructor() { }

  ngOnInit() {
  }

  checked(event) {
    if (event === true) {
      document.getElementById('customCheck12').style.borderLeft = '5px solid #FB7B04';
      this.boxChecked = true;
    } else {
      document.getElementById('customCheck12').style.borderLeft = 'none';
      this.boxChecked = false;
   }
  }
}
