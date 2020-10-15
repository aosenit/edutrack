import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  constructor(private home: AddStudentsComponent) { }

  ngOnInit() {
  }

  nextStep() {
    this.home.stepper(4);
  }

}
