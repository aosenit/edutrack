import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { StudentService } from 'src/services/data/student/student.service';

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
  constructor(
              private fb: FormBuilder,
              private studentService: StudentService,
              private notifyService: NotificationsService,
              private router: Router
  ) { }

  ngOnInit() {
    this.finalStepForm = this.fb.group({
      profilePhoto: null
    });
  }


  createStudent() {
    const basicDetials = JSON.parse(sessionStorage.getItem('basic-details')) ;
    const contactDetails = JSON.parse(sessionStorage.getItem('contact-details')) ;
    const socialDetails = JSON.parse(sessionStorage.getItem('social-details')) ;
    const medicalDetails = JSON.parse(sessionStorage.getItem('medical-details')) ;
    const finals = this.finalStepForm.value;

    const result = {
      ...basicDetials,
      ...contactDetails,
      ...socialDetails,
      ...medicalDetails,
      ...finals,
      DocumentTypes: this.DocumentTypes
    };
    console.log('VERIFY PARENT ID', result.ParentId);
    this.studentService.addStudent(result).subscribe((data: any) => {
      console.log('student created', data);
      if ( data.hasErrors === false) {
        console.log(data);
        this.notifyService.publishMessages( data.description, 'success', 1);
        sessionStorage.clear();
        this.router.navigateByUrl('/school/students');

      }
    }, error => {
      this.notifyService.publishMessages( error.errors, 'success', 1);
    });
  }


  handleImgUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log('file', file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.finalStepForm.patchValue({
          fileSource: reader.result
        });
      };
      this.profileImageName = file.name;
      this.finalStepForm.get('profilePhoto').setValue(file);
      this.DocumentTypes.push(2);
      // this.iconname = this.icon.name;
    }
  }



}
