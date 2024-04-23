import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, ContentChild, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  stage = 1;
  currentStep: any;
  progress = 350;
  active = '1';

  message = 'Personal Information';

  constructor() { }



  ngOnInit() {
   
  }


  stepper(step: any) {
    this.stage = step;
    this.currentStep = document.getElementById('step-' + step);
    const progress = document.getElementById('progress');
    if (this.stage === 2) {
      this.message = 'Employee Details';
    } else if (this.stage === 3) {
      this.message = 'Contact Details';
    } else if (this.stage === 4) {
      this.message = 'Next Of Kin Information';
    } else if (this.stage === 5) {
      this.message = 'Education';
    } else if (this.stage === 6) {
      this.message = 'Work Experience';
    } else if (this.stage === 7) {
      this.message = 'Images';
    } else {
      this.message = 'Personal Information';

    }
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

  ngOnDestroy() {
    sessionStorage.removeItem('employee-personal-data');
    sessionStorage.removeItem('Employee-Data');
    sessionStorage.removeItem('employee-contact-details');
    sessionStorage.removeItem('employee-education');
    sessionStorage.removeItem('employee-next-kin');
    sessionStorage.removeItem('employee-experience');
    sessionStorage.removeItem('all-employee-info');

  }


}
