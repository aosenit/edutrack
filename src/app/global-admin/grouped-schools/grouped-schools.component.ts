import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grouped-schools',
  templateUrl: './grouped-schools.component.html',
  styleUrls: ['./grouped-schools.component.css']
})
export class GroupedSchoolsComponent implements OnInit {

  stage = 1;
  currentStep: any;
  active = '1';
  message: any;
  constructor() { }

  ngOnInit() {
  }


  stepper(step: any) {
    this.stage = step;
    this.currentStep = document.getElementById('step-' + step);
    console.log(this.currentStep)
    this.currentStep.classList.add('active');

    for (let index = 1; index < 3; index++) {
      if (index < step) {
      }  else if (index >= step) {
        // document.getElementById('button-' + index).innerHTML = '' + index;
      }
    }
  }

  getChildName(data) {
    // // ('data from child', data);
    this.message = data;
  }

  back() {
    window.history.back();
    sessionStorage.clear();
  }
}
