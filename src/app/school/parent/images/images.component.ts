import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

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
              private parentService: ParentsService,
              private notifyService: NotificationsService,
              private router: Router
  ) { }

  ngOnInit() {
    this.finalStepForm = this.fb.group({
      profileImage: null
    });
  }



  createParent() {
    const basic = JSON.parse(sessionStorage.getItem('parent-basic-details'));
    const social = JSON.parse(sessionStorage.getItem('parent-social-details'));
    const finals = this.finalStepForm.value;

    const result = {...basic, ...social, ...finals, DocumentTypes: this.DocumentTypes};


    this.parentService.addParent(result).subscribe( (data: any) => {
        if (data.hasErrors === false) {
          console.log(data);
          this.notifyService.publishMessages( data.description, 'success', 1);
          sessionStorage.clear();
          this.router.navigateByUrl('/school/parents');
        }
      },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
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
      this.finalStepForm.get('profileImage').setValue(file);
      this.DocumentTypes.push(2);
      // this.iconname = this.icon.name;
    }
  }



}
