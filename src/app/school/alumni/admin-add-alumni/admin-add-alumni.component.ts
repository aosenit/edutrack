import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AlumniService } from 'src/services/data/alumni/alumni.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { StudentService } from 'src/services/data/student/student.service';

@Component({
  selector: 'app-admin-add-alumni',
  templateUrl: './admin-add-alumni.component.html',
  styleUrls: ['./admin-add-alumni.component.css']
})
export class AdminAddAlumniComponent implements OnInit {


  alumniForm: FormGroup;
  sections: any;
  studentList: any;
  dropdownSettings = {};
  terms: any;
  selectedStudent: any;

  constructor(
    private fb: FormBuilder,
    private assessmentService: AssessmentService,
    private studentService: StudentService,
    private alumniService: AlumniService,
    private router: Router,
    private notifyService: NotificationsService,



  ) { }

  ngOnInit() {
    this.initiateForm();
    this.getSchoolSection();
    this.getAllStudents();
  }

  initiateForm() {
    this.alumniForm = this.fb.group({
        studId: ['', Validators.required],
        sessionName: ['', Validators.required],
        termName: ['', Validators.required],
        reason: ['', Validators.required]
    });
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      allowRemoteDataSearch: true,

    };
  }

  getSchoolSection() {
    this.assessmentService.getSchoolSessions().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }

  getSessionTerm(event: any) {
    this.sections.forEach((element, index) => {
      if (element.name === event) {
        this.terms = element.terms;
      }
    });
  }

  getAllStudents() {
    this.studentService.getAllStudents(1, 500).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const arr = [];
        res.payload.forEach(item => {
          arr.push({
            id: item.id,
            name: `${item.firstName + ' '  + item.lastName}`
          });
        });
        this.studentList = arr;
      }
    });
  }

  onItemSelect(event) {
    this.selectedStudent = event.id;
    // cons
    // this.alumniForm.controls.studId.setValue(event.id);
  }

  searchParents(event) {
  }

  addToAlumniList() {
    const {studId, sessionName, termName, reason} = this.alumniForm.value;
    const result =  {
      sessionName,
      termName,
      reason,
      // tslint:disable-next-line:radix
      studId: parseInt(this.selectedStudent)
    };
    this.alumniService.createNewAllumni(result).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notifyService.publishMessages('Alumni added successfull', 'success', 1);
        this.router.navigateByUrl('/school/alumni-list');
      } else {
        this.notifyService.publishMessages(res.errors, 'danger', 1);

      }
    });
  }
  back() {
    window.history.back();
  }

}
