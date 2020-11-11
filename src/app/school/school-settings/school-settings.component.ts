import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ClassArmService } from 'src/services/data/class-arm/class-arm.service';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { SubjectService } from 'src/services/data/subject/subject.service';

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
  addNewClassForm: FormGroup;
  newsubjectForm: FormGroup;
  section: any = '';
  classes: any;
  levels: any;
  name: any = '';
  classSection: any = '';
  // classArmId: any = '';
  sectionId: number;
  sequence: number;
  notifyService: any;
  toggleState = false;
  dropdownSettings = {};
  dropdownList = [];
  classBySectionList: any;
  classBySectionDropdownList = [];
  subjectList: any;

  constructor(
    private fb: FormBuilder,
    private notification: NotificationsService,
    private classArmService: ClassArmService,
    private schoolService: SchoolService,
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private subjectService: SubjectService
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
    this.newsubjectForm = this.fb.group({
      Name: ['', Validators.required],
      IsActive: [],
      classSectionIds: []
    });
    this.populateNewClassForm();
    this.getClassArms();
    this.getClasses();
    this.getSections();
    // this.getAllSubjects();


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'arm',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
  }

  populateNewClassForm() {
    this.addNewClassForm = this.fb.group({
      name: ['', Validators.required],
      sectionid: [Validators.required],
      classArm: ['', Validators.required],
      sequenceid: [Validators.required],
      status: []
    });
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
    this.classArmService.addClassArm(this.classArmform.value).subscribe((data: any) => {
      console.log(data);
      this.notification.publishMessages(data.description, 'info', 1);
      document.getElementById('close').click();
      // location.reload();
    }, error => {
      this.notification.publishMessages(error.errors, 'danger', 1);
    });
  }

  createNewClass() {
    // this.classSection = parseInt(this.classSection);
    // this.classArm = parseInt(this.classArm);
    const { name, sectionid, classArm, sequenceid, status } = this.addNewClassForm.value;
    const classArmIds = classArm.map((arms: any) => {
      return arms.id;
    });
    // tslint:disable-next-line:radix
    const sectionId = parseInt(sectionid);
    // tslint:disable-next-line:radix
    const sequence = parseInt(sequenceid);
    const result = {
      name,
      sectionId,
      classArmIds,
      sequence,
      status
    };
    this.classService.addClass(result).subscribe((data: any) => {
      console.log('class create', data);
      if (data.hasErrors === false) {
        this.notification.publishMessages('Class Added Successfully', 'info', 1);
        document.getElementById('close').click();
      }
    }, error => {
      this.notification.publishMessages(error.errors, 'danger', 1);
    });


  }


  getState(event) {
    console.log('status', event);


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
        // tslint:disable-next-line:no-string-literal
        this.classArms = data['payload'];
        const arr = [];
        this.classArms.forEach(item => {
          arr.push({
            id: item.id,
            arm: item.name
          });
        });
        this.dropdownList = arr;
      }
    });
  }


  createSection() {
    this.schoolSectionService.addSection(this.section).subscribe(
      (res: any) => {
        if (res.hasErrors === false) {
          console.log('level created', res);
          this.notification.publishMessages('You have successfully added a section', 'info', 0);
          this.getSections();
        }
      }
    );
  }

  getSections() {
    this.schoolSectionService.getSection().subscribe(
      res => {
        // tslint:disable-next-line:no-string-literal
        this.levels = res['payload'];
        console.log('levels', this.levels);
      }
    );
  }

  getSectionId(id) {
    console.log(id);
    this.classService.getClassBySection(id).subscribe(
      (res: any) => {
        if (res.hasErrors === false) {
          this.classBySectionList = res.payload;
          console.log(this.classBySectionList);
          const arr = [];
          this.classBySectionList.forEach(item => {
            arr.push({
              id: item.id,
              arm: item.name
            });
          });
          this.classBySectionDropdownList = arr;
        }
      }
    );
  }



  getClasses() {
    this.classService.getAllClasses().subscribe(
      (res: any) => {
        this.classes = res.payload;
        console.log('classes', res);
      }
    );
  }

  deleteArm(id) {
    this.classArmService.deleteClassArm(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.getClassArms();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  createSubject() {
    console.log('arrays', this.newsubjectForm.value);
    const { Name, IsActive, classSectionIds } = this.newsubjectForm.value;
    const ClassIds = classSectionIds.map((ids: any) => {
      return ids.id;
    });
    const result = {
      Name,
      ClassIds,
      IsActive
    };
    console.log('subjects to be created', result);
    this.subjectService.addNewSubject(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        document.getElementById('close').click();
      }
    });

  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
        console.log(this.subjectList);
      }
    });
  }

}
