import { Component, OnInit } from '@angular/core';
import { AlumniService } from 'src/services/data/alumni/alumni.service';

@Component({
  selector: 'app-alumni-events',
  templateUrl: './alumni-events.component.html',
  styleUrls: ['./alumni-events.component.css']
})
export class AlumniEventsComponent implements OnInit {
  eventLists: any;

  constructor(
    private alumni: AlumniService
  ) { }

  ngOnInit() {
    this.getAllAlumiEvents();
  }

  getAllAlumiEvents() {
    this.alumni.getAllEvents().subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log('events', res.payload);
        this.eventLists = res.payload;
      }
    });
  }

}
