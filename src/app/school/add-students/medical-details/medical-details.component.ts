import { Component, OnInit, ɵConsole } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { SchoolService } from 'src/services/data/school/school.service';
import { StudentService } from 'src/services/data/student/student.service';
@Component({
  selector: 'app-medical-details',
  templateUrl: './medical-details.component.html',
  styleUrls: ['./medical-details.component.css']
})
export class MedicalDetailsComponent implements OnInit {
  medicalForm: FormGroup;
  constructor(
    private fb: FormBuilder,
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

  createStudent() {
    const basicDetials = JSON.parse(sessionStorage.getItem('basic-details')) ;
    const contactDetails = JSON.parse(sessionStorage.getItem('contact-details')) ;
    const socialDetails = JSON.parse(sessionStorage.getItem('social-details')) ;
    const medicalDetails = this.medicalForm.value;

    const result = { ...basicDetials, ...contactDetails, ...socialDetails, ...medicalDetails};
    console.log('sasasa', result);
    this.studentService.addStudent(result).subscribe((data: any) => {
      console.log(result);
      if ( data.hasErrors === false) {
        console.log(data);
      }
    }, error => {
      console.log(error);
    });
  }

}
