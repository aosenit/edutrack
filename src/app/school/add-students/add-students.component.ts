import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.css']
})
export class AddStudentsComponent implements OnInit {

  stage = 1;
  currentStep: any;
  active = '1';
  constructor() { }

  ngOnInit() {
    console.log('hello');
  }


  stepper(step: any) {
    this.stage = step;
    this.currentStep = document.getElementById('step-' + step);
    this.currentStep.classList.add('active');

    for (let index = 1; index < 4; index++) {
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
