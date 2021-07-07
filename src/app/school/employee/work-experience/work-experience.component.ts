import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';

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
  minDate: string;


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

  getStartDate(e) {
    this.minDate = moment(e).format('YYYY-MM-DD');
  }

  addExperience() {
    this.items = this.employeeWorkExperienceForm.get('WorkExperienceVMs') as FormArray;
    this.items.push(this.createItem());
  }


  getAActiveTab() {
    this.workDetials = JSON.parse(sessionStorage.getItem('employee-experience'));

    if (sessionStorage.getItem('employee-next-kin') !== null) {
      // // (`School person exists`);
      this.employeeWorkExperienceForm.patchValue({
        WorkExperienceVMs: this.workDetials.WorkExperienceVMs,
      });
    } else {
    }

  }

  getProfileInformation() {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));

    this.employeeWorkExperienceForm.setControl('WorkExperienceVMs', this.setExistingComponent(payload.workExperienceVMs));

  }

  setExistingComponent(data: any) {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));

    const formArray = new FormArray([]);
    for (const x of data) {
      // // (x);
      formArray.push(this.fb.group({
       workRole: x.workRole,
       workCompanyName: x.workCompanyName,
       startTime: moment(x.endDate).format('YYYY-MM-DD'),
       endTime: moment(x.startDate).format('YYYY-MM-DD'),
     }));
   }

    return formArray;
 }


}
