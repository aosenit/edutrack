import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { AddStudentsComponent } from '../add-students.component';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.css']
})
export class SocialDetailsComponent implements OnInit {
  socialDetailsForm: FormGroup;
  sections: any;
  classes: any;
  constructor(private home: AddStudentsComponent, private sectionServcie: SchoolSectionService, private classService: ClassService, private fb: FormBuilder) { }

  ngOnInit() {
    this.socialDetailsForm = this.fb.group({
      entryType: ['', Validators.required],
      admissionDate: ['', Validators.required],
      level: ['', Validators.required],
      studentClass: ['', Validators.required],
      studentType: ['', Validators.required],


    });

    this.getSections()
  }

  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('social-details', JSON.stringify(this.socialDetailsForm.value));
  }

  getSections() {
    this.sectionServcie.getSection().subscribe(
      res => {
        this.sections = res['payload']
      }
    )
  }

  getClassesUnderSection(id) {
    this.classService.getClassBySection(id).subscribe(
      res => {
        this.classes = res['payload']
      }
    )
  }


}
