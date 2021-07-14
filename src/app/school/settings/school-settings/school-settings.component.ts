import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
export class SchoolSettingsComponent implements OnInit, OnDestroy {

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
  dropdownSettings2 = {};
  dropdownList = [];
  classBySectionList: any;
  classBySectionDropdownList = [];
  theLevel: any;
  theClass: any;
  theArm: any;
  subjectList: any;
  classCount: number;
  subjectCount: number;
  p = 1;
  itemsPerPage = 5;
  testSubjectArray = [];

  private ngUnsubscribe = new Subject();

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
      Name: ['', Validators.required],
      Status: ['']
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
    this.getAllSubjects();


    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'arm',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };

    this.dropdownSettings2 = {
      singleSelection: false,
      idField: 'id',
      textField: 'classandSection',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      enableCheckAll: false,
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
    // console.log('class arm create', this.classArmform.value);
    this.classArmService.addClassArm(this.classArmform.value).subscribe((data: any) => {
      // console.log(data);
      this.notification.publishMessages(data.description, 'info', 1);
      document.getElementById('myClassArmModal').click();
      this.classArmform.reset();
      this.getClassArms();
      // location.reload();
    }, error => {
      this.notification.publishMessages(error.errors, 'danger', 1);
    });
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

  getArmById(id) {
    this.classArmService.getClassArmById(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (res: any) => {
        this.theArm = res.payload;
      }
    );
  }

  editArm(id) {
    const result = {
      Name: this.theArm.name,
      Status: this.theArm.status
    };
    this.classArmService.updateClassArm(id, result).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.code === 1) {
          this.notification.publishMessages('You have successfully updated this class arm', 'info', 0);
          this.getClassArms();
          // location.reload();
        } else {
          this.notification.publishMessages(res.errors[0], 'info', 0);

        }
      }
    );
  }

  deleteArm(id) {
    this.classArmService.deleteClassArm(id).subscribe((data: any) => {
      if (data.code === 1) {
        // console.log(data);
        this.notification.publishMessages('You have succesfully deleted a class arm', 'info', 0);
        this.getClassArms();
      }
    }, error => {
      this.notification.publishMessages(error.errors, 'danger', 1);

    });
  }


  getState(event) {
    // console.log('status', event);


  }

  getStatus(event) {
    if (event === true) {
      this.toggleState = true;
    } else {
      this.toggleState = false;

    }

  }



  createSection() {
    const result = {
      name: this.section,
    };
    this.schoolSectionService.addSection(result).subscribe(
      (res: any) => {
        if (res.hasErrors === false) {
          // console.log('level created', res);
          this.notification.publishMessages('You have successfully added a section', 'info', 0);
          this.getSections();
          // this.section = ''
        }
      }
    );
  }

  getSections() {
    this.schoolSectionService.getSection()
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (res: any) => {
        // tslint:disable-next-line:no-string-literal
        this.levels = res['payload'];
        this.levels = this.levels.reverse();
        // console.log('levels', this.levels);
      }
    );
  }

  getSection(id) {
    this.schoolSectionService.getSectionById(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (res: any) => {
        this.theLevel = res.payload;
        // console.log(this.theLevel);
      }, error => {
        // console.log(error);
      }
    );
  }

  editSection() {
    const result = {
      id: this.theLevel.id,
      name: this.theLevel.name,
    };
    // console.log(id);
    this.schoolSectionService.updateSection(result).subscribe((res: any) => {
      // console.log(res);
      if (res.hasErrors === false) {
        // console.log(res);
        this.notification.publishMessages('You have successfully edited this section', 'info', 0);
        document.getElementById('editSectionModal').click();
        this.getSections();
      }
    }, error => {
      this.notification.publishMessages(error.error, 'warning', 0);
    });
  }

  deleteSection(id) {
    this.schoolSectionService.deleteSection(id).subscribe(
      res => {
        this.notification.publishMessages('You have successfully deleted a section', 'info', 0);
        this.getSections();
      }
    );
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
      // console.log('class create', data);
      if (data.code === 1) {
        this.notification.publishMessages('Class Added Successfully', 'info', 1);
        document.getElementById('close').click();
        this.addNewClassForm.reset();
        this.getClasses();
      }
    }, error => {
      this.notification.publishMessages(error.errors, 'danger', 1);
    });


  }

  getClassById(id) {
    this.classService.getClassById(id)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (res: any) => {
        this.theClass = res.payload;

      }
    );
  }

  editClass() {
    this.classService.editClass(this.theClass.id, this.theClass.name).subscribe(
      (res: any) => {
        if (res.code === 1) {
          this.notification.publishMessages('You have successfully updated this class!', 'info', 0);
          this.getClasses();
        } else {
          this.notification.publishMessages(res.description, 'warning', 0);
        }
      }
    );
  }


  getClassBySectionId(id) {
    // console.log(id);
    this.classService.getClassBySection(id)
    .subscribe(
      (res: any) => {
        if (res.hasErrors === false) {
          this.classBySectionList = res.payload;
          // console.log(this.classBySectionList);
          const arr = [];
          this.classBySectionList.forEach(item => {
            const className = item.name;
            const classAndSection = className.concat(item.classGroup);
            arr.push({
              id: item.id,
              classandSection: classAndSection
            });
          });
          this.classBySectionDropdownList = arr;
        }
      }
    );
  }



  getClasses() {
    this.classService.getAllClassesWithPagination(this.p, this.itemsPerPage)
.subscribe(
      (res: any) => {
        this.classes = res.payload;
        // console.log(this.classes);
        this.classCount = res.totalCount;
        // console.log('classes', this.classCount);
      }
    );
  }

  getPage(page: number) {
    this.classService.getAllClassesWithPagination(page, this.itemsPerPage)
        .pipe(takeUntil(this.ngUnsubscribe))
.subscribe(
      (res: any) => {
        this.classes = res.payload;
        this.classCount = res.totalCount;
        // console.log('classes', res);
      }, error => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);

      });
  }

  deleteClass(id) {
    this.classService.deleteClassById(id).subscribe(
      res => {
        this.notification.publishMessages('You have successfully deleted a class', 'info', 0);
        this.getClasses();
      }
    );
  }


  onItemSelect(event) {
    // console.log(event);
    this.testSubjectArray.push(event.id);
    // console.log('new subject list', this.testSubjectArray);

  }

  onSelectAll(event) {
    // console.log(event);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < event.length; i++) {
      this.testSubjectArray.push(event[i].id);
    }
    // console.log('new subject list', this.testSubjectArray);

  }

  onItemDeSelect(event) {
    // console.log(`${event.id}`);

    const index = this.testSubjectArray.indexOf(event.id);
    // console.log(index);
    if (index > -1) {
        this.testSubjectArray.splice(index, 1);
      }
    // console.log('new subject list', this.testSubjectArray);

  }


  createSubject() {
    // console.log('arrays', this.newsubjectForm.value);
    const { Name, IsActive } = this.newsubjectForm.value;
    const ClassIds = this.testSubjectArray;
    // const ClassIds = classSectionIds.map((ids: any) => {
    //   return ids.id;
    // });
    const result = {
      Name,
      ClassIds,
      IsActive
    };
    // console.log('subjects to be created', result);
    this.subjectService.addNewSubject(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data);
        document.getElementById('mySubjectModal').click();
        this.newsubjectForm.reset();
        this.notification.publishMessages('You have succesfully created a subject', 'info', 0);
        this.getAllSubjects();
      } else {
        this.notification.publishMessages(data.errors, 'info', 0);
     }
    });

  }

  getAllSubjects() {
    this.subjectService.getPaginatedSubject(this.p, this.itemsPerPage)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
        this.subjectCount = data.totalCount;

        // console.log(this.subjectList);
      }
    });
  }

  getSubjectPages(page: number) {
    this.subjectService.getPaginatedSubject(page, this.itemsPerPage)
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      (res: any) => {
        this.subjectList = res.payload;
        this.subjectCount = res.totalCount;
        // console.log('classes', res);
      }, error => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);

      });
  }


  getSubjectById(id) {
    // this.subjectService
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
}

}
