import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ClassArmService } from 'src/services/data/class-arm/class-arm.service';
import { ClassService } from 'src/services/data/class/class.service';
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

  createClassArm() {
    console.log('class arm create', this.classArmform.value);
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
    });
  }

  getStatus(event) {
    console.log('status', event);
    if (event === true) {
      event.value = true;
    }

  }

  getClassArms() {
    this.classArmService.getAllClassArm().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classArms = data['payload'];
      }
    });
  }


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

}
