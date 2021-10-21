import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { parse } from 'querystring';
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

  arm = true;
  level = false;
  class = false;
  subject = false;
  mail = false;
  id = 1;
  classArms: any;
  levelform: FormGroup;
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
  dropdownSettingsSubject = {};
  dropdownSettings2 = {};
  dropdownList = [];
  classBySectionList: any;
  classBySectionDropdownList = [];
  subjectsForClassDropDownList = [];
  theLevel: any;
  theClass: any;
  theArm: any;
  subjectList: any;
  classCount: number;
  subjectCount: number;
  p = 1;
  itemsPerPage = 10;
  testSubjectArray = [];

  private ngUnsubscribe = new Subject();
  editsubjectForm: FormGroup;
  subjectStatus: any;
  selectedSubjectdata: any;
  subjecttoggleUpdate: any;
  editClassForm: FormGroup;
  newsubjectToClassForm: FormGroup;
  subjectsForCLass: any;

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
    this.levelform = this.fb.group({
      section: ['', Validators.required],
      status: [false]
    });
    this.classArmform = this.fb.group({
      Name: ['', Validators.required],
      status: [false, Validators.required]
    });
    this.createNewClassForm = this.fb.group({
      name: ['', Validators.required],
      sectionId: [''],
      classGroupId: ['']
    });
    this.editClassForm = this.fb.group({
      name: ['', Validators.required],
      id: [''],
    });
    this.newsubjectForm = this.fb.group({
      Name: ['', Validators.required],
      IsActive: [false],
      classSectionIds: []
    });
    this.newsubjectToClassForm = this.fb.group({
      Name: ['', Validators.required],
      id: ['', Validators.required],
      subjectIds: ['', Validators.required]
    });
    this.editsubjectForm = this.fb.group({
      name: ['', Validators.required],
      IsActive: [false],
    });
    this.populateNewClassForm();
    this.getClassArms();
    this.getClasses();
    this.getSections();
    this.getAllSubjects();
    this.getAllSubjectsNoPage();


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
    this.dropdownSettingsSubject = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      enableCheckAll: true,
    };
  }

  populateNewClassForm() {
    this.addNewClassForm = this.fb.group({
      name: ['', Validators.required],
      sectionid: [Validators.required],
      classArm: ['', Validators.required],
      sequenceid: ['', Validators.required],
      status: [false]
    });
  }


  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus) {

      case 'arm':
        this.arm = true;
        this.level = false;
        this.class = false;
        this.subject = false;
        this.mail = false;
        break;

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
        this.getAllSubjectsNoPage();
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
    const {Name, status} = this.classArmform.value;
    const result = {
      Name,
      status: this.toggleState
    };
    this.classArmService.addClassArm(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.notification.publishMessages(data.description, 'info', 1);
        document.getElementById('myClassArmModal').click();
        this.classArmform.reset();
        this.getClassArms();
      } else {

        this.notification.publishMessages(data.errors, 'danger', 1);
      }
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
    const { section } = this.levelform.value;
    const result = {
      name: section,
    };
    this.schoolSectionService.addSection(result).subscribe(
      (res: any) => {
        if (res.hasErrors === false) {
          // console.log('level created', res);
          document.getElementById('closeCreateLevelModal').click();
          this.notification.publishMessages('You have successfully added a level', 'info', 0);
          this.levelform.reset();
          this.getSections();
          // this.section = ''
        } else {
          this.notification.publishMessages(res.errors, 'danger', 0);

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
          // // ('levels', this.levels);
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
      name: this.theLevel.name,
    };
    // // (id);
    this.schoolSectionService.updateSection( this.theLevel.id, result).subscribe((res: any) => {
      // console.log(res);
      if (res.hasErrors === false) {
        // console.log(res);
        this.notification.publishMessages('You have successfully updated this level', 'info', 0);
        document.getElementById('editSectionModal').click();
        this.getSections();
      } else {

        this.notification.publishMessages(res.errors, 'danger', 0);
      }
    }, error => {
      this.notification.publishMessages(error.error, 'danger', 0);
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
      } else {

        this.notification.publishMessages(data.errors, 'danger', 1);
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
          console.log(res.payload);
          this.editClassForm.patchValue({
            name: res.payload.className,
            id: res.payload.id
          });
          console.log(this.editClassForm.value);
        }
      );
  }

  getSubjectForClassById(id) {
    this.classService.getClassById(id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res: any) => {
          this.theClass = res.payload;
          this.newsubjectToClassForm.patchValue({
            Name: res.payload.name,
            id: res.payload.id,
          });
        }
      );


  }


  editClass() {
    const {name, id} = this.editClassForm.value;
    const payload = {
      id: parseInt(id),
      name
    };
    this.classService.editClass(payload).subscribe(
      (res: any) => {
        if (res.code === 1) {
          this.notification.publishMessages('You have successfully updated this class!', 'info', 0);
          document.getElementById('closeEditClassForm').click();
          this.getClasses();
        } else {
          this.notification.publishMessages(res.description, 'danger', 0);
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
  onItemSelectSubject(event) {
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
    // // ('subjects to be created', result);
    this.subjectService.addNewSubject(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data);
        document.getElementById('mySubjectModal').click();
        this.newsubjectForm.reset();
        this.notification.publishMessages('You have succesfully created a subject', 'info', 0);
        this.getAllSubjects();
      } else {
        this.notification.publishMessages(data.errors, 'danger', 0);
      }
    });

  }

  createNewSubjectClass() {
    const { id, subjectIds } = this.newsubjectToClassForm.value;
    const subjects = subjectIds.map((item: any) => {
      return item.id;
    });
    // const ClassIds = classSectionIds.map((ids: any) => {
    //   return ids.id;
    // });
    const result = {
      classId: parseInt(id),
      subjectIds: subjects
    };
    // // ('subjects to be created', result);
    this.subjectService.addNewSubjectToClass(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data);
        this.notification.publishMessages('You have succesfully added subject(s)', 'info', 0);
        this.newsubjectToClassForm.reset();
        document.getElementById('moreSubjectModal').click();
        this.getClasses();
      } else {
        this.notification.publishMessages(data.errors, 'danger', 0);
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
        }
      });
  }
  getAllSubjectsNoPage() {
    this.subjectService.getAllSubjectsNoPagination()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.subjectsForCLass = data.payload;
          const arr = [];
          this.subjectsForCLass.forEach(item => {
            arr.push({
              id: item.id,
              name: item.name
            });
          });
          this.subjectsForClassDropDownList = arr;

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
    this.selectedSubjectdata = this.subjectList[id];
    this.editsubjectForm.patchValue({
      name: this.selectedSubjectdata.name,
    });
    this.subjectStatus = this.selectedSubjectdata.isActive;

  }



  toggleSubjectUpdate(e) {
    this.subjectStatus = e;
  }
  updateSubject() {
    const {name} = this.editsubjectForm.value;
    const result = {
      // tslint:disable-next-line:radix
      id: parseInt(this.selectedSubjectdata.id),
      name,
      isActive: this.subjectStatus
    };
    console.log(result);
    this.subjectService.updateSubjects(result).subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.notification.publishMessages(res.description, 'info', 0);
        document.getElementById('editSubjectModalClose').click();
        this.getAllSubjects();
      } else {
        this.notification.publishMessages(res.errors, 'danger', 0);
      }
    });

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
