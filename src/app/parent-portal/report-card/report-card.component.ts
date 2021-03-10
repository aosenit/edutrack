import { Component, OnInit } from '@angular/core';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.css']
})
export class ReportCardComponent implements OnInit {
noData = false;
  sessionList: any;
  sessionId: any;
  termList: any;
  constructor(
    private parentService: ParentsService
  ) { }

  ngOnInit() {
    this.getSession();
  }




  getSession() {
    this.parentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sessionList = data.payload;
        // console.log(this.terms);
      }
    });
  }

  getTerms(i) {
    console.log(this.sessionList[i]);
    this.sessionId = this.sessionList[i].id;
    this.termList = this.sessionList[i].terms;
  }

}
