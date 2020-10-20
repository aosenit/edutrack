import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../parent.component';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {

  constructor(private home: ParentComponent) { }

  ngOnInit() {
  }

  nextStep() {
    this.home.stepper(2);
  }
}
