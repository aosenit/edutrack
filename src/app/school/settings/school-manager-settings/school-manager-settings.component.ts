import { sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { PropertyService } from 'src/services/data/property/property.service';
import * as moment from 'moment';

@Component({
  selector: 'app-school-manager-settings',
  templateUrl: './school-manager-settings.component.html',
  styleUrls: ['./school-manager-settings.component.css']
})
export class SchoolManagerSettingsComponent implements OnInit {
  schoolPropertyForm: FormGroup;
  sessionForm: FormGroup;
  fillProperty: any;
  items: any;
  termCount: any;
  hide: true;
  sequence = 0;
  sequencenumber: number;
  sessionList: any;
  dateCheck: any;
  date1: any;
  date2: any;
  schoolPropertyButton = 'Create';
  modalTitle = 'Add New Term';
  createTermButton = 'Add Term';
  selectedterm: any;
  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private notifyService: NotificationsService,
    private assessmentService: AssessmentService

  ) { }

  ngOnInit() {
    this.populateSchoolPropertyForm();
    this.getProperty();
    this.populateSessionForm();
    this.getSession();
  }

  back() {
    window.history.back();
  }

  populateSchoolPropertyForm() {
    this.schoolPropertyForm = this.fb.group({
      prefix: ['', Validators.required],
      seperator: ['', Validators.required],
      EnrollmentAmount: ['', Validators.required],
      numberOfTerms: ['', Validators.required],
      ClassDays: ['', Validators.required]
    });
  }

  populateSessionForm() {
    this.sessionForm = this.fb.group({
      sessionName: ['', Validators.required],
      isCurrent: false,
      terms: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    const step = this.sequence++;
    return this.fb.group({
      name: ['', Validators.required],
      sequenceNumber: step,
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  getCurrent(event) {
  }

  addTerm() {
    this.items = this.sessionForm.get('terms') as FormArray;
    for (let i = 0; i < this.termCount; i++) {
      this.items.push(this.createItem());
    }
  }

  createProperty() {
    const { prefix, seperator, EnrollmentAmount, numberOfTerms, ClassDays } = this.schoolPropertyForm.value;
    // tslint:disable-next-line:radix
    const classDays = parseInt(ClassDays);
    // tslint:disable-next-line:radix
    const enrollmentAmount = parseInt(EnrollmentAmount);
    const result = {
      prefix,
      seperator,
      enrollmentAmount,
      numberOfTerms,
      classDays
    };

    this.propertyService.addProperty(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.notifyService.publishMessages('School Property saved successfully', 'success', 1);
        this.getProperty();
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }


  getProperty() {
    this.propertyService.getProperty().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.fillProperty = data.payload;
        this.schoolPropertyForm.setValue({
          prefix: this.fillProperty.prefix,
          seperator: this.fillProperty.seperator,
          EnrollmentAmount: this.fillProperty.enrollmentAmount,
          numberOfTerms: this.fillProperty.numberOfTerms,
          ClassDays: this.fillProperty.classDays
        });
        this.schoolPropertyButton = 'Update';
        this.termCount = this.fillProperty.numberOfTerms - 1;
        this.addTerm();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  createSession() {
    // (this.sessionForm);
    const {sessionName, isCurrent, terms} = this.sessionForm.value;
    const newterm = [];
      // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < terms.length; index++) {
        const element = terms[index];
        newterm.push({
          name: element.name,
          sequenceNumber: element.sequenceNumber,
          startDate: element.startDate,
          endDate: `${element.endDate + 'T23:59'}`
        });
      }
    const result = {
      sessionName,
      isCurrent,
      terms: newterm
    };
    if (this.createTermButton === 'Add Term') {

      this.assessmentService.addProperty(result).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.notifyService.publishMessages('Term & Session created successfully', 'success', 1);
          // (data);
          document.getElementById('mySessionModal').click();
          this.getSession();
        } else {

          this.notifyService.publishMessages(data.errors, 'danger', 1);
        }
      }, error => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);
      });
    } else {
      this.assessmentService.updateProperty(this.selectedterm.id, result).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.notifyService.publishMessages('Term & Session created successfully', 'success', 1);
          // (data);
          document.getElementById('mySessionModal').click();
          this.getSession();
        } else {

          this.notifyService.publishMessages(data.errors, 'danger', 1);
        }
      }, error => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);
      });
    }
  }

  getSession() {
    this.assessmentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.sessionList = data.payload;
      }
    });
  }

  validateStartDate(value) {
    // (value);
    this.date1 = value;
  }
  validateEndDate(value) {
    // (value);
    this.date2 = value;
    if (moment(this.date2).isBefore(this.date1)) {
      this.dateCheck = true;
      // ('ko possinle na');
    }
  }

  getTermDetails(index, id) {
    console.log(id);
    this.selectedterm = this.sessionList[index];
    const selectedterm = this.sessionList[index];
    this.modalTitle = 'Update Term';
    this.createTermButton = 'Update Term';
    this.sessionForm.patchValue({
      sessionName: selectedterm.name,
      isCurrent: selectedterm.isCurrent
    });
    this.sessionForm.setControl('terms', this.setExistingComponent(selectedterm.terms));

  }

  setExistingComponent(data: any) {
    const payload: any = JSON.parse(sessionStorage.getItem('all-employee-info'));

    const formArray = new FormArray([]);
    for (const x of data) {
      // // (x);
      formArray.push(this.fb.group({
        name: x.name,
      sequenceNumber: x.sequenceNumber,
      startDate: moment(x.startDate).format('YYYY-MM-DD'),
      endDate: moment(x.endDate).format('YYYY-MM-DD'),
     }));
   }

    return formArray;
 }


}
