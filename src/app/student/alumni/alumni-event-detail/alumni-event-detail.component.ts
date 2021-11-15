import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumniService } from 'src/services/data/alumni/alumni.service';

@Component({
  selector: 'app-alumni-event-detail',
  templateUrl: './alumni-event-detail.component.html',
  styleUrls: ['./alumni-event-detail.component.css']
})
export class AlumniEventDetailComponent implements OnInit {
  eventLists: any;
  pageId: any;
  eventDetails: any;

  constructor(
    private alumni: AlumniService,
    private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.pageId = this.route.snapshot.params.id;
    this.getEventByid();

  }

  back() {
    window.history.back();
  }

  getEventByid() {
    this.alumni.getAllAlumniEventId(this.pageId).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log(res);
        this.eventDetails = res.payload;
      }
    });
  }

}
