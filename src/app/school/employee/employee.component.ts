import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ContentChild, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  stage = 1;
  currentStep: any;
  progress = 350;
  active = '1';

  message: any;

  constructor() { }



  ngOnInit() {
  }

  getChildName(data) {
    this.message = data;
  }

  stepper(step: any) {
    this.stage = step;
    this.currentStep = document.getElementById('step-' + step);
    const progress = document.getElementById('progress');
    // this.currentStep.classList.add('active');

    for (let index = 1; index < 9; index++) {
      if (index < step) {
        progress.style.width = `${this.progress }px`;
      }  else if (index > step) {
        // document.getElementById('button-' + index).innerHTML = '' + index;
      }
    }
  }

  back() {
    window.history.back();
  }


}
