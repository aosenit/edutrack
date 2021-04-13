import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
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
    this.currentStep.classList.add('active');

    for (let index = 1; index < 3; index++) {
      if (index < step) {
      }  else if (index >= step) {
        // document.getElementById('button-' + index).innerHTML = '' + index;
      }
    }
  }

  getChildName(data) {
    // console.log('data from child', data);
    this.message = data;
  }

  back() {
    window.history.back();
    sessionStorage.clear();
  }

}
