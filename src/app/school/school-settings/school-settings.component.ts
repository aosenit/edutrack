import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ClassArmService } from 'src/services/data/class-arm/class-arm.service';
import { ClassService } from 'src/services/data/class/class.service';
=======
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ClassArmService } from 'src/services/data/class-arm/class-arm.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83
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
<<<<<<< HEAD
  id = 1;
  classArms: any;
  classArmform: FormGroup;
  createNewClassForm: FormGroup;
  section: any = '';
  classes: any;
  levels: any;
  name: any = ''
  classSection: any = ''
  classArm: any = ''

  constructor(
    private fb: FormBuilder,
    private notification: NotificationsService,
    private classArmService: ClassArmService,
    private schoolService: SchoolService,
    private classService: ClassService
  ) { }
  ngOnInit() {
    this.classArmform = this.fb.group({
      name: ['', Validators.required],
      status: ['']
    });
    this.createNewClassForm = this.fb.group({
      name: ['', Validators.required],
      sectionId: [''],
      classGroupId: ['']
    });

    this.getClassArms();
    this.getClasses()
    this.getSections()
=======
  id: any;
  classArmform: FormGroup;
  levelForm: FormGroup;
  newClassForm: FormGroup;
  classArm: any;
  toggleState = false;
  classArmDetial: any;
  constructor(
    private fb: FormBuilder,
    private classArmService: ClassArmService,
    private schoolSectionService: SchoolSectionService,
    private notifyService: NotificationsService,
    private route: ActivatedRoute

    ) { }
  ngOnInit() {
    this.getClassArms();
    this.populateClassArmForm();
    this.populateLevelForm();
    this.populateClassForm();
    this.getClassArmbyId();
    // this.getAllSchoolSections();
>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83
  }


  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus) {

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
<<<<<<< HEAD
    this.classArmService.addClassArm(this.classArmform.value).subscribe(data => {
      console.log(data);
      this.getClassArms()
    });
  }
  createNewClass() {
    this.classSection = parseInt(this.classSection)
    this.classArm = parseInt(this.classArm)
    console.log(this.classSection)
    this.classService.addClass(this.name, this.classSection, this.classArm).subscribe(data => {
      console.log(data);
      this.getClasses()
=======
    this.classArmService.addClassArm( this.classArmform.value).subscribe((data: any) => {
      console.log(data);
      this.notifyService.publishMessages(data.description, 'info', 1);
      document.getElementById('close').click();
      location.reload();
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83
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
    this.classArmService.getAllClassArm().subscribe((data: any) => {
      if (data.hasErrors === false) {
<<<<<<< HEAD
        this.classArms = data['payload'];
=======
        console.log( data.payload);
        this.classArm = data.payload;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getClassArmbyId() { 
  }

  editClassArm(id) {
    console.log('asasa', id);
    this.classArmService.getClassArmById(id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.classArmDetial = data.payload;
        this.populateEditClassArm(this.classArmDetial);
>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  populateEditClassArm(payload) {
    this.newClassForm.setValue({
      name: payload.name,
      status: payload.status
    });

  }

  deleteArm(id) {
    this.classArmService.deleteClassArm(id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        console.log( data);
        this.getClassArms();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }


<<<<<<< HEAD
  createSection() {
    this.schoolService.addSection(this.section).subscribe(
      res => {
        this.notification.publishMessages('You have successfully added a section', 'info', 0)
        this.getSections()
      }
    )
  }
  getSections() {
    this.schoolService.getSection().subscribe(
      res => {
        this.levels = res['payload']
      }
    )
  }


  getClasses() {
    this.classService.getAllClasses().subscribe(
      res => {
        this.classes = res['payload']
        // console.log('classes', res)
      }
    )
  }

=======
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

  getValue(event) {
    console.log(event);
  }

  // getAllSchoolSections() {
  //   this.schoolSectionService.getLevels().subscribe( data => {
  //     console.log(data);
  //   });
  // }
>>>>>>> be6b64c9f40fbee927e9c39e1eb6942e4e05ab83
}
