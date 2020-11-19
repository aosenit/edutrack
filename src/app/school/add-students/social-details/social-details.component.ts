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
  constructor(
    private home: AddStudentsComponent,
    private sectionServcie: SchoolSectionService,
    private classService: ClassService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.socialDetailsForm = this.fb.group({
      EntryType: ['', Validators.required],
      AdmissionDate: ['', Validators.required],
      SectionId : ['', Validators.required],
      ClassId : ['', Validators.required],
      StudentType: ['', Validators.required],


    });

    this.getSections();
    // this.getClassesUnderSection();
  }

  nextStep() {
    this.home.stepper(3);
    sessionStorage.setItem('social-details', JSON.stringify(this.socialDetailsForm.value));
  }

  getSections() {
    this.sectionServcie.getSection().subscribe(
      (res: any) => {
        this.sections = res.payload;
      }
    );
  }

  getClassesUnderSection(id) {
    this.classService.getClassBySection(id).subscribe(
      (res: any) => {
        this.classes = res.payload;
        console.log(this.classes);
      }
    );
  }


}
