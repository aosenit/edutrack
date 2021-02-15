import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';
import { ParentComponent } from '../parent.component';

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
  step: any;
  formBtn = {
    type: 'create',
    text: 'Create Parent'
  };
  paarentId: any;
  constructor(
    private fb: FormBuilder,
    private parentService: ParentsService,
    private notifyService: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private home: ParentComponent


  ) { }

  ngOnInit() {
    this.paarentId = this.route.snapshot.params.id;
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
      profileImage: null
    });
  }

  updateMediaForm() {
    this.finalStepForm = this.fb.group({
      profileImage: null
    });
    this.formBtn = {
      type: 'Update',
      text: 'Update Parent'
    };
  }



  createParent() {
    const basic = JSON.parse(sessionStorage.getItem('parent-basic-details'));
    const social = JSON.parse(sessionStorage.getItem('parent-social-details'));
    const finals = this.finalStepForm.value;

    const result = { ...basic, ...social, ...finals, DocumentTypes: this.DocumentTypes };


    if (this.formBtn.type === 'create') {
      this.parentService.addParent(result).subscribe((data: any) => {
        if (data.code === 1) {
          console.log(data);
          this.notifyService.publishMessages(data.description, 'success', 1);
          sessionStorage.removeItem('parent-basic-details');
          sessionStorage.removeItem('parent-social-details');
          this.location.back();
        }
      },
        error => {
          this.notifyService.publishMessages(error.errors[0], 'danger', 1);
        });
    } else {
      this.parentService.updateParent( this.paarentId, result).subscribe((data: any) => {
        if (data.code === 1) {
          console.log(data);
          this.notifyService.publishMessages(data.description, 'success', 1);
          sessionStorage.removeItem('parent-basic-details');
          sessionStorage.removeItem('parent-social-details');
          this.location.back();
        }
      },
        error => {
          this.notifyService.publishMessages(error.errors[0], 'danger', 1);
        });
    }


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
      // this.DocumentTypes.push(2);

      this.finalStepForm.get('profileImage').setValue(file);
      const size = event.target.files[0].size;
      if (size > 1048576) {
        this.notifyService.publishMessages('File size too large', 'danger', 1);
        this.DocumentTypes.pop();
      } else if (this.DocumentTypes.length > 1) {
        this.DocumentTypes.shift();
        console.log(this.DocumentTypes);
      }
      // this.iconname = this.icon.name;
    }
  }


  prevStep() {
    this.home.stepper(2);
    this.currentStep = document.getElementById('step-' + `${2 + 1}`);
    this.currentStep.classList.remove('active');


  }

}
