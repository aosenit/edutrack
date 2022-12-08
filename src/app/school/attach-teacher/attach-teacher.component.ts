import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';

@Component({
  selector: 'app-attach-teacher',
  templateUrl: './attach-teacher.component.html',
  styleUrls: ['./attach-teacher.component.css']
})
export class AttachTeacherComponent implements OnInit {
teacher = false;
emptyRecord = false;
sections: any;
classes: any;
id: any;
teacherDetails: any;
classTeacherDetails: any;
subjectList: any;
dropdownList = [];
dropdownSettings = {};
attachSubjectForm: FormGroup;
classTeacherForm: FormGroup;
attachedSubjectlist: any;



  constructor(
    private fb: FormBuilder,
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private subjectService: SubjectService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.populateAttachSubjectForm();
    this.populateAttachTeacherForm();
    this.getAllSections();
    this.getAllClassess();
    this.getTeacherByID();
    this.getAttachedSubject();
    this.getAttachedTeacher();
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

  back() {
    window.history.back();
  }

  getStaffStatus(event: string) {
    if (event === 'yes') {
        this.teacher = true;
    } else {
      if (event === 'no') {
        this.teacher = false;
        document.getElementById('classteacherModal').click();
      }
    }
  }

  populateAttachSubjectForm() {
    this.attachSubjectForm = this.fb.group({
      subjectIds: ['', Validators.required],
      // TeacherId: ['', Validators.required]
    });
  }

  populateAttachTeacherForm() {
    this.classTeacherForm = this.fb.group({
      ClassId: ['', Validators.required],
    });
  }

  getAllSections() {
    this.schoolSectionService.getSection().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }

  getClassBySectionId(id) {
    // (id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classes = data.payload;

        }
      });

  }

  getAllClassess() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // this.classes = data.payload;
        // // (this.classes);
      }
    });
  }

  getTeacherByID() {
    this.teacherService.getTeacherById(this.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teacherDetails = data.payload;
        // console.log(this.teacherDetails);
      }
    });
  }


  getSubjects(id) {
    // console.log(id);
    this.classService.getSubjectForClass(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
        const arr = [];
        this.subjectList.forEach(item => {
          arr.push({
            id: item.id,
            arm: item.subject
          });
        });
        this.dropdownList = arr;
      }

    }
    );
  }

  attachSubject() {
    // console.log(this.attachSubjectForm.value);
    const {subjectIds} = this.attachSubjectForm.value;
    const  ClassSubjectIds = subjectIds.map((ids: any) => {
      return ids.id;
    });
    // tslint:disable-next-line:radix
    const TeacherId = parseInt(this.id);
    // tslint:disable-next-line:radix
    // const ClassSubjectIds = parseInt(newSubjectIds);
    const result = {
      TeacherId,
      ClassSubjectIds
    };
    // console.log(result);
    this.teacherService.attachTeacherToSubject(result).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        // console.log(data);
        document.getElementById('myModal').click();
        this.getAttachedSubject();
        this.notifyService.publishMessages('Subject successfully attached to teacher ', 'info', 1);
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getAttachedSubject() {
    // console.log(this.id);
    this.teacherService.getAttachedSubjects(this.id).subscribe((data: any) => {
      // // (data);
      this.attachedSubjectlist = data.payload;
      // console.log('sasaassasasasasasas', this.attachedSubjectlist);
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  attachTeacher() {
    const {ClassId} = this.classTeacherForm.value;
    // tslint:disable-next-line:radix
    const classId = parseInt(ClassId);
    // tslint:disable-next-line:radix
    const teacherId = parseInt(this.id);
    const result = {
      classId,
      teacherId
    };
    this.teacherService.attachTeacherToClass(result).subscribe((data: any) => {
      // console.log(data);
      if (data.hasErrors === false ) {
        document.getElementById('classteacherModal').click();
        this.getAttachedTeacher();
        this.notifyService.publishMessages('Teacher successfully attached to class ', 'info', 1);
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getAttachedTeacher() {
    this.teacherService.getTeacherAttachedToClass(this.id).subscribe((data: any) => {
      // console.log(data);
      if (data.hasErrors === false ) {
        this.classTeacherDetails = data.payload;
      } else {

        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

}
