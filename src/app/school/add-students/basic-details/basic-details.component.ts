import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css']
})
export class BasicDetailsComponent implements OnInit {

  constructor(private home: AddStudentsComponent) { }

  ngOnInit() {
  }

  nextStep() {
    this.home.stepper(2);
  }

}
