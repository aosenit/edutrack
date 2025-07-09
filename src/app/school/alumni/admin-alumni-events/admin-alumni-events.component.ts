import { Component, OnInit } from '@angular/core';
import { AlumniService } from 'src/services/data/alumni/alumni.service';

@Component({
  selector: 'app-admin-alumni-events',
  templateUrl: './admin-alumni-events.component.html',
  styleUrls: ['./admin-alumni-events.component.css']
})
export class AdminAlumniEventsComponent implements OnInit {
  searchString = '';
  eventLists: any;
  isSearch = false;

  constructor(
    private alumni: AlumniService
  ) { }

  ngOnInit() {
    this.getAllAlumiEvents();

  }

  getAllAlumiEvents() {
    this.isSearch = !!this.searchString;
    this.alumni.getAllEvents(this.searchString).subscribe((res: any) => {
      if (res.hasErrors === false) {
        console.log('events', res.payload);
        this.eventLists = res.payload;
      }
    });
  }

}
