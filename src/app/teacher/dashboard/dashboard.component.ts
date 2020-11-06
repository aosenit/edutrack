import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showPop() {
    const popcard = document.querySelector('.pop-card-holder');
    popcard.classList.toggle('show-pop');
  }


  showPop2() {
    const popcard = document.querySelector('.pop-card-holder2');
    popcard.classList.toggle('show-pop');
  }


}
