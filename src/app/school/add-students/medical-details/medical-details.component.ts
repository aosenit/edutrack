import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
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
  constructor(
    private fb: FormBuilder,
    private home: AddStudentsComponent,
    private studentService: StudentService) { }

  ngOnInit() {
    this.medicalForm = this.fb.group({
      bloodGroup: ['', Validators.required],
      genotype: ['', Validators.required],
      disability: ['', Validators.required],
      allergies: ['', Validators.required],
      immunization: ['', Validators.required],
      age: ['', Validators.required],
      note: ['', Validators.required],
      date: ['', Validators.required],
      vaccine: ['', Validators.required]
    });
  }



  nextStep() {
    this.home.stepper(5);
    sessionStorage.setItem('medical-details', JSON.stringify(this.medicalForm.value));
  }

}
