import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
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

  constructor(
    private fb: FormBuilder,
    private home: AddStudentsComponent,
    private studentService: StudentService) { }

  ngOnInit() {
    this.medicalForm = this.fb.group({
      BloodGroup: ['', Validators.required],
      Genotype: ['', Validators.required],
      Disability: ['', Validators.required],
      Allergies: ['', Validators.required],
      ConfidentialNotes: ['', Validators.required],
      immunizationVms: this.fb.array([ this.createItem() ]),
    });
  }



  nextStep() {
    this.home.stepper(5);
    sessionStorage.setItem('medical-details', JSON.stringify(this.medicalForm.value));
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

}
