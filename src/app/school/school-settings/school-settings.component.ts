import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ClassArmService } from 'src/services/data/class-arm/class-arm.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { SchoolService } from 'src/services/data/school/school.service';

@Component({
  selector: 'app-school-settings',
  templateUrl: './school-settings.component.html',
  styleUrls: ['./school-settings.component.css']
})
export class SchoolSettingsComponent implements OnInit {

  level = true;
  class = false;
  arm = false;
  subject = false;
  mail = false;
  id = 1;
  classArmform: FormGroup;
  levelForm: FormGroup;
  newClassForm: FormGroup;
  classArm: any;
  toggleState: any;
  constructor(
    private fb: FormBuilder,
    private classArmService: ClassArmService,
    private schoolSectionService: SchoolSectionService,
    private notifyService: NotificationsService,

    ) { }
  ngOnInit() {

    this.populateClassArmForm();
    this.populateLevelForm();
    this.populateClassForm();

    this.getClassArms();
  }


  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus ) {

      case 'level':
          this.level = true;
          this.class = false;
          this.arm = false;
          this.subject = false;
          this.mail = false;
          break;


      case 'class':
          this.level = false;
          this.class = true;
          this.arm = false;
          this.subject = false;
          this.mail = false;
          break;

      case 'arm':
          this.level = false;
          this.class = false;
          this.arm = true;
          this.subject = false;
          this.mail = false;
          break;

      case 'subject':
          this.level = false;
          this.class = false;
          this.arm = false;
          this.subject = true;
          this.mail = false;
          break;

      case 'mail':
          this.level = false;
          this.class = false;
          this.arm = false;
          this.subject = false;
          this.mail = true;
          break;

      default:
        this.level = true;
    }
  }

populateClassArmForm() {
  this.classArmform = this.fb.group({
    name: ['', Validators.required],
    status: ['']
  });
}

populateLevelForm() {
  this.levelForm = this.fb.group({
    name: ['', Validators.required],
    sequence: ['', Validators.required],
    status: []
  });
}

populateClassForm() {
  this.newClassForm = this.fb.group({
    name: ['', Validators.required],
    level: ['', Validators.required],
    arm: [''],
    sequence: [''],
    status: ['']
  });
}

createClassArm() {
    console.log('class arm create', this.classArmform.value);
    this.classArmService.addClassArm( this.classArmform.value).subscribe((data: any) => {
      console.log(data);
      this.notifyService.publishMessages(data.description, 'info', 1);
      document.getElementById('close').click();
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }

  getClassArms() {
    this.classArmService.getAllClassArm().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        console.log( data.payload);
        this.classArm = data.payload;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  submitLevel() {
    console.log(this.levelForm.value);
    this.schoolSectionService.addlevel(this.levelForm.value).subscribe( (data: any) => {
      if (data.hasErrors === false ) {
        console.log(data.payload);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'info', 1);
    } );

  }

}
