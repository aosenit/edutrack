import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { StudentService } from 'src/services/data/student/student.service';
import { AddStudentsComponent } from '../add-students.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
finalStepForm: FormGroup;
DocumentTypes: number[] = [];
  profileImageName = null;
  imageSrc: any;
  currentStep: any;
  studentid: any;

  formBtn = {
    type: 'create',
    text: 'Create '
  };
  constructor(
              private fb: FormBuilder,
              private studentService: StudentService,
              private notifyService: NotificationsService,
              private router: Router,
              private route: ActivatedRoute,
              private home: AddStudentsComponent,

  ) { }

  ngOnInit() {
    this.studentid = this.route.snapshot.params.id;
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.createMediaForm();
      } else {
        this.updateMediaForm();
      }
    });

  }

  createMediaForm() {
    this.finalStepForm = this.fb.group({
      profilePhoto: null
    });
  }
  updateMediaForm() {
    this.finalStepForm = this.fb.group({
      profilePhoto: null
    });
  }

  createStudent() {
    const basicDetials = JSON.parse(sessionStorage.getItem('student-basic-details')) ;
    const contactDetails = JSON.parse(sessionStorage.getItem('student-social-details')) ;
    const socialDetails = JSON.parse(sessionStorage.getItem('Student-contact-details')) ;
    const medicalDetails = JSON.parse(sessionStorage.getItem('student-medical-details')) ;
    const finals = this.finalStepForm.value;

    const result = {
      ...basicDetials,
      ...contactDetails,
      ...socialDetails,
      ...medicalDetails,
      ...finals,
      DocumentTypes: this.DocumentTypes
    };
    // console.log('VERIFY PARENT ID', result.ParentId);
    this.studentService.addStudent(result).subscribe((data: any) => {
        // console.log('student created', data);
        if ( data.hasErrors === false) {
          // console.log(data);
          this.notifyService.publishMessages( data.description, 'success', 1);
          sessionStorage.removeItem('student-basic-details');
          sessionStorage.removeItem('student-social-details');
          sessionStorage.removeItem('Student-contact-details');
          sessionStorage.removeItem('student-medical-details');
          this.router.navigateByUrl('/school/students');

        } else {
          this.notifyService.publishMessages( data.errors, 'success', 1);

        }
      }, error => {
        this.notifyService.publishMessages( error.errors, 'success', 1);
      });
  }


  updateStudent() {
    const basicDetials = JSON.parse(sessionStorage.getItem('student-basic-details')) ;
    const contactDetails = JSON.parse(sessionStorage.getItem('student-social-details')) ;
    const socialDetails = JSON.parse(sessionStorage.getItem('Student-contact-details')) ;
    const medicalDetails = JSON.parse(sessionStorage.getItem('student-medical-details')) ;
    const finals = this.finalStepForm.value;

    const result = {
      ...basicDetials,
      ...contactDetails,
      ...socialDetails,
      ...medicalDetails,
      ...finals,
      DocumentTypes: this.DocumentTypes
    };
    // console.log('VERIFY PARENT ID', result.ParentId);
    // console.log('result', result);
    this.studentService.updateStudent(this.studentid, result).subscribe((data: any) => {
        // console.log('student updated', data);
        if ( data.hasErrors === false) {
          // console.log(data);
          this.notifyService.publishMessages( data.description, 'success', 1);
          sessionStorage.removeItem('student-basic-details');
          sessionStorage.removeItem('student-social-details');
          sessionStorage.removeItem('Student-contact-details');
          sessionStorage.removeItem('student-medical-details');
          this.router.navigateByUrl('/school/students');
          this.router.navigateByUrl('/school/students');


        } else {
          this.notifyService.publishMessages( data.errors, 'danger', 1);

        }
      }, error => {
        this.notifyService.publishMessages( error.errors, 'danger', 1);
      });
  }

  handleImgUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      // console.log('file', file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.finalStepForm.patchValue({
          fileSource: reader.result
        });
      };
      this.profileImageName = file.name;
      this.DocumentTypes.push(2);
      // console.log(this.DocumentTypes);

      this.finalStepForm.get('profilePhoto').setValue(file);

      const size = event.target.files[0].size;
      if (size >=  1048576 ) {
        this.notifyService.publishMessages('File size too large', 'danger', 1);
        this.DocumentTypes.pop();
      } else if (this.DocumentTypes.length > 1) {
        this.DocumentTypes.shift();
        // console.log(this.DocumentTypes);
      }
      // this.iconname = this.icon.name;
    }
  }

  prevStep() {
    this.home.stepper(4);
    this.currentStep = document.getElementById('step-' + `${4 + 1}`);
    this.currentStep.classList.remove('active');
  }


}
