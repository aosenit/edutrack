import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  view = false;
  clipnote = true;
    constructor() { }
  
    ngOnInit() {
    }
  
    checked(event) {
      if (event === true) {
        this.view = true;
        this.clipnote = false;
      } else {
        this.view = false;
        this.clipnote = true;
      }
    }

}
