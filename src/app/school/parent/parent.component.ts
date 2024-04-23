import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit, OnDestroy {

  stage = 1;
  currentStep: any;
  active = '1';
  constructor(private location: Location) { }

  ngOnInit() {
  }


  stepper(step: any) {
    this.stage = step;
    this.currentStep = document.getElementById('step-' + step);
    this.currentStep.classList.add('active');

    for (let index = 1; index < 3; index++) {
      if (index < step) {
      }  else if (index > step) {
        // document.getElementById('button-' + index).innerHTML = '' + index;
      }
    }
  }

  back() {
    this.location.back()
    // window.history.back();
  }

  ngOnDestroy() {
    sessionStorage.removeItem('parent-basic-details');
    sessionStorage.removeItem('parent-social-details');
  }
}
