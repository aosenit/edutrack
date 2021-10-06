import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { AddStudentsComponent } from '../add-students.component';
import * as moment from 'moment';

@Component({
  selector: 'app-social-details',
  templateUrl: './social-details.component.html',
  styleUrls: ['./social-details.component.css']
})
export class SocialDetailsComponent implements OnInit {
  socialDetailsForm: FormGroup;
  sections: any;
  classes: any;
  currentStep: any;
  step: any;
  socialDetails: any;
  studentid: any;
  newStudentType: number;

  constructor(
    private home: AddStudentsComponent,
    private sectionServcie: SchoolSectionService,
    private classService: ClassService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    this.studentid = this.route.snapshot.params.id;
    this.getSections();

    this.populateStudentSocialDetails();
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.populateStudentSocialDetails();
      } else {
        this.getProfileInformation();

      }
    });
    this.getActiveTab();
    // this.getClassesUnderSection();
  }

  populateStudentSocialDetails() {
    this.socialDetailsForm = this.fb.group({
      EntryType: ['', Validators.required],
      AdmissionDate: ['', Validators.required],
      sectionId : ['', Validators.required],
      classId : ['', Validators.required],
      studentType: ['', Validators.required],


    });
  }
  nextStep() {
    this.home.stepper(3);
    const {EntryType, AdmissionDate, sectionId, classId, studentType } = this.socialDetailsForm.value;
    const result = {
      EntryType,
      AdmissionDate,
      SectionId: parseInt(sectionId),
      ClassId: parseInt(classId),
      StudentType: parseInt(studentType)
    };

    sessionStorage.setItem('student-social-details', JSON.stringify(result));
  }

  prevStep() {
    this.home.stepper(1);
    this.currentStep = document.getElementById('step-' + `${1 + 1}`);
    this.currentStep.classList.remove('active');
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
        // console.log(this.classes);
      }
    );
  }

  getActiveTab() {

    this.socialDetails = JSON.parse( sessionStorage.getItem('student-social-details'));

    if (sessionStorage.getItem('student-social-details') !== null) {
      // console.log(`Student social details exists`);

      this.socialDetailsForm.patchValue({
        EntryType: this.socialDetails.EntryType,
      AdmissionDate: moment(this.socialDetails.admissionDate).format('YYYY-MM-DD'),
      sectionId : this.socialDetails.SectionId,
      classId : this.socialDetails.ClassId,
      studentType: this.socialDetails.StudentType,
      });
      this.getClassesUnderSection(this.socialDetails.SectionId);
    } else {
      // console.log(`Student social details not found`);
    }
  }

  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('all-student-info'));
    // console.log('na the paylod', payload);
    if (payload.studentType === 'DayStudent') {
      this.newStudentType = 1;
    } else {
      this.newStudentType = 2;

    }
    this.socialDetailsForm.patchValue({
      EntryType: payload.EntryType,
    AdmissionDate: moment(payload.admissionDate).format('YYYY-MM-DD'),
    SectionId : payload.SectionId,
      ClassId : payload.ClassId,
      studentType: this.newStudentType,
    });
    this.getClassesUnderSection(payload.SectionId);


  }


}
