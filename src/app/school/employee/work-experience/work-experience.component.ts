import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
@Output() sendChildName = new EventEmitter<string>();
employeeWorkExperienceForm: FormGroup;
items: any;
workDetials: any;


  constructor(
    private home: EmployeeComponent,
    private fb: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.sendChildName.emit('Work experience');
    this.populateEmployeeExperienceForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateEmployeeExperienceForm();
      } else {
        this.getProfileInformation();

      }
    });
  }

populateEmployeeExperienceForm() {
    this.employeeWorkExperienceForm = this.fb.group({
      WorkExperienceVMs: this.fb.array([ this.createItem() ])
    });
  }

  nextStep() {
    this.home.stepper(7);
    sessionStorage.setItem('employee-experience', JSON.stringify(this.employeeWorkExperienceForm.value));

  }

  prevStep() {
    this.home.stepper(5);
    // this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    // this.currentStep.classList.remove('active');
  }


  createItem(): FormGroup {
    return this.fb.group({
      workRole: ['', Validators.required],
      workCompanyName: ['', Validators.required],
      startTime	: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  addExperience() {
    this.items = this.employeeWorkExperienceForm.get('WorkExperienceVMs') as FormArray;
    this.items.push(this.createItem());
  }


  getAActiveTab() {
    this.workDetials = JSON.parse(sessionStorage.getItem('employee-experience'));

    if (sessionStorage.getItem('employee-next-kin') !== null) {
      // console.log(`School person exists`);
      this.employeeWorkExperienceForm.patchValue({
        WorkExperienceVMs: this.workDetials.WorkExperienceVMs,
      });
    } else {
    }

  }

  getProfileInformation() {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < payload.workExperienceVMs.length; i++) {
      console.log('asasaass', payload.workExperienceVMs[i]);
      this.employeeWorkExperienceForm.patchValue({
        WorkExperienceVMs: payload.workExperienceVMs
      });
    }
  }


}
