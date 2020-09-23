import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showPop() {
    const popcard = document.querySelector('.pop-card-holder');
    popcard.classList.toggle('show-pop');
  }

  removePop() {
    const popcard = document.querySelector('.pop-card-holder');
    popcard.classList.remove('show-pop');
  }

}
