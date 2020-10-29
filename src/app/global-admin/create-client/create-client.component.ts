import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  stage = 1;
  currentStep: any;
  active = '1';
  constructor() { }

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
    window.history.back();
  }

}
