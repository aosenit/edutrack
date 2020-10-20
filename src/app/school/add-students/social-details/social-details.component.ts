import { Component, OnInit } from '@angular/core';
import { AddStudentsComponent } from '../add-students.component';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.css']
})
export class SocialDetailsComponent implements OnInit {

  constructor(private home: AddStudentsComponent) { }

  ngOnInit() {
  }

  nextStep() {
    this.home.stepper(3);
  }

}
