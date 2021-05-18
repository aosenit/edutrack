import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import * as moment from 'moment';
import { SchoolService } from 'src/services/data/school/school.service';
import { StudentService } from 'src/services/data/student/student.service';
import { AddStudentsComponent } from '../add-students.component';
@Component({
  selector: 'app-medical-details',
  templateUrl: './medical-details.component.html',
  styleUrls: ['./medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  medicalForm: FormGroup;
  items: any;
  currentStep: any;
  step: any;
  medicalDetials: any;
  studentid: any;


  constructor(
    private fb: FormBuilder,
    private home: AddStudentsComponent,
    private studentService: StudentService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.studentid = this.route.snapshot.params.id;

    this.populateMedicalForm();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateMedicalForm();
      } else {
        this.getProfileInformation();

      }
    });
    this.getActiveTabDetails();
  }


  populateMedicalForm() {
    this.medicalForm = this.fb.group({
      BloodGroup: ['', Validators.required],
      Genotype: ['', Validators.required],
      Disability: [''],
      Allergies: [''],
      ConfidentialNotes: [''],
      immunizationVms: this.fb.array([ this.createItem() ]),
    });
  }


  nextStep() {
    this.home.stepper(5);
    sessionStorage.setItem('student-medical-details', JSON.stringify(this.medicalForm.value));
  }

  addImmunization() {
    this.items = this.medicalForm.get('immunizationVms') as FormArray;
    this.items.push(this.createItem());
  }

  createItem(): FormGroup {
    return this.fb.group({
      age: ['', Validators.required],
      date: ['', Validators.required],
      vaccine: ['', Validators.required]
    });
  }

  prevStep() {
    this.home.stepper(3);
    this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    this.currentStep.classList.remove('active');
  }

  getActiveTabDetails() {
    this.medicalDetials = JSON.parse( sessionStorage.getItem('student-medical-details'));

    if (sessionStorage.getItem('student-medical-details') !== null) {
      console.log(`Student medicals exists`);
      this.medicalForm.patchValue({
        BloodGroup: this.medicalDetials.BloodGroup,
        Genotype: this.medicalDetials.Genotype,
        Disability: this.medicalDetials.Disability,
        Allergies: this.medicalDetials.Allergies,
        ConfidentialNotes: this.medicalDetials.ConfidentialNotes ,
        // immunizationVms: this.medicalDetials.immunizationVms
      });
      this.medicalForm.setControl('immunizationVms', this.setExistingComponent(this.medicalDetials.immunizationHistoryVMs));
    } else {
      console.log(`Student medicals not found`);
    }

  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('all-student-info'));
    console.log('na the paylod', payload);
    this.medicalForm.patchValue({
      BloodGroup: payload.bloodGroup,
      Genotype: payload.genotype,
      Disability: payload.Disability ,
      Allergies: payload.allergies,
      ConfidentialNotes: payload.confidentialNote ,
      // immunizationVms: payload.immunizationVms
    });

    this.medicalForm.setControl('immunizationVms', this.setExistingComponent(payload.immunizationHistoryVMs));


  }

  setExistingComponent(data: any) {
    const payload = JSON.parse(sessionStorage.getItem('all-student-info'));

    const formArray = new FormArray([]);
    for (const x of data) {
      console.log(x);
      formArray.push(this.fb.group({
       age: x.age,
       date: moment(x.date).format('YYYY-MM-DD'),
       vaccine: x.vaccine,
     }));
   }

    return formArray;
 }

}
