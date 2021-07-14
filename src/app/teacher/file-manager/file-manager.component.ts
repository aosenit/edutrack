import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { parse } from 'querystring';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ClassWorkService } from 'src/services/data/class-work/class-work.service';
import { ClassService } from 'src/services/data/class/class.service';
import { LessonNoteService } from 'src/services/data/lesson-note/lesson-note.service';
import { SubjectService } from 'src/services/data/subject/subject.service';


@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {

  view = false;
  clipnote = true;
  changetext = true;

  uploadClassNoteForm: FormGroup;
  uploadClassWorkForm: FormGroup;
  uploadAssignmentForm: FormGroup;
  classList: any;
  subjectsInClass: any;
  assignmentFile = null;
  allLessonNote: any;
  lessonDetails: any;
  classworkList: any;
  assignmentlist: any;
  lessonId: any;
  p = 1;
  itemsPerPage = 5;
  assignmentCount: number;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private classService: ClassService,
    private lessonNoteService: LessonNoteService,
    private assignmentService: AssignmentService,
    private classWorkService: ClassWorkService,
    private notifyService: NotificationsService,


  ) { }

  ngOnInit() {
    this.populateClassNoteForm();
    this.populateClassWorkForm();
    this.populateAssignmentForm();
    // all forms goes up there

    this.getAllClasses();
    this.getAllLessonNotesByTeacher();
    this.getAllClassWorkByTeacher();
    this.getAllAssignmentsByTeacher();
  }

  populateClassNoteForm() {
    this.uploadClassNoteForm = this.fb.group({
      subjectId: ['', Validators.required],
      Comment: ['', Validators.required],
      FileObj: [null]

    });
  }

  populateClassWorkForm() {
    this.uploadClassWorkForm = this.fb.group({
      subjectId: ['', Validators.required],
      Comment: ['', Validators.required],
      FileObj: [null]

    });
  }

  populateAssignmentForm() {
    this.uploadAssignmentForm = this.fb.group({
      Title: ['', Validators.required],
      subjectId: ['', Validators.required],
      classId: ['', Validators.required],
      DueDate: ['', Validators.required],
      TotalScore: ['', Validators.required],
      Comment: ['', Validators.required],
      Document: null,
    });
  }


  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classList = data.payload;
        // (this.classList);
      }
    }
    );
  }

  getSubjects(id) {
    // (id);
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectsInClass = data.payload;
        // (this.subjectsInClass);
      }
    }
    );
  }

  handleFileUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // ('file', file);
      this.assignmentFile = file.name;
      this.uploadClassNoteForm.get('FileObj').setValue(file);
      // this.iconname = this.icon.name;
    }
  }
  handleClassWorkUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // ('file', file);
      this.assignmentFile = file.name;
      this.uploadClassWorkForm.get('FileObj').setValue(file);
      // this.iconname = this.icon.name;
    }
  }
  handleAssignmentUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // ('file', file);
      this.assignmentFile = file.name;
      this.uploadAssignmentForm.get('Document').setValue(file);
      // this.iconname = this.icon.name;
    }
  }


  submitClassNote() {
    const { subjectId, Comment, FileObj } = this.uploadClassNoteForm.value;
    // tslint:disable-next-line:radix
    const ClassSubjectId = parseInt(subjectId);
    // tslint:disable-next-line:radix
    const result = {
      ClassSubjectId,
      Comment,
      FileObj
    };
    this.lessonNoteService.addLessonNote(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        document.getElementById('close').click();
        this.notifyService.publishMessages('Class note uploaded successfully', 'info', 1);
        this.getAllLessonNotesByTeacher();

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    }
    );
  }

  submitClassWork() {
    const { subjectId, Comment, FileObj } = this.uploadClassWorkForm.value;
    // tslint:disable-next-line:radix
    const ClassSubjectId = parseInt(subjectId);
    // tslint:disable-next-line:radix
    const result = {
      ClassSubjectId,
      Comment,
      FileObj
    };
    this.classWorkService.addClassWork(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        document.getElementById('myModal2').click();
        this.notifyService.publishMessages('Class work uploaded successfully', 'info', 1);
        this.getAllClassWorkByTeacher();

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    }
    );
  }

  submitAssignment() {
    const { Title, subjectId, DueDate, TotalScore, Comment, Document } = this.uploadAssignmentForm.value;
    // tslint:disable-next-line:radix
    const ClassSubjectId = parseInt(subjectId);
    // tslint:disable-next-line:radix
    const result = {
      Title,
      ClassSubjectId,
      DueDate,
      TotalScore,
      Comment,
      Document
    };
    this.assignmentService.addAssignment(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        document.getElementById('myModal').click();
        // location.reload();
        this.notifyService.publishMessages('Assignment uploaded successfully', 'info', 1);
        this.getAllAssignmentsByTeacher();

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    }
    );
  }

  getAllLessonNotesByTeacher() {
    this.lessonNoteService.getLessonNotesByTeacher().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // ('lesson Notes', data);
        this.allLessonNote = data.payload;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    }
    );
  }

  getAllClassWorkByTeacher() {
    this.classWorkService.getClassWorkByTeacher().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // ('class work', data);
        this.classworkList = data.payload;
        // (this.classworkList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    }
    );
  }

  getAllAssignmentsByTeacher() {
    this.assignmentService.getAssignmentByTeacher(this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // ('Assignment', data);
        this.assignmentlist = data.payload;
        this.assignmentCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    }
    );
  }

  getPage(page: number) {
    // (page);
    this.assignmentService.getAssignmentByTeacher(page, this.itemsPerPage).subscribe((data: any) => {
      // (data);
      if (data.hasErrors === false) {
        // ('asasasa', data);
        this.assignmentlist = data.payload;
        this.assignmentCount = data.totalCount;
      }
    }, error => {
      // (error);
    });
  }

  getLessonDetails(event, i) {
    if (event.target.checked === true) {
      sessionStorage.setItem('lesson-notes', JSON.stringify(this.allLessonNote[i]));
      this.lessonId = event.target.value;
      this.lessonDetails = JSON.parse(sessionStorage.getItem('lesson-notes'));
      this.view = true;
      this.clipnote = false;
    } else {
      this.view = false;
      this.clipnote = true;
    }
  }

  getAssignmentDetails(event, i) {
    if (event.target.checked === true) {
      sessionStorage.setItem('assignment', JSON.stringify(this.assignmentlist[i]));
      this.lessonDetails = JSON.parse(sessionStorage.getItem('assignment'));
      this.view = true;
      this.clipnote = false;
    } else {
      this.view = false;
      this.clipnote = true;
    }
  }

  getClassWorkDetails(event, i) {
    if (event.target.checked === true) {
      sessionStorage.setItem('class-work', JSON.stringify(this.assignmentlist[i]));
      this.lessonDetails = JSON.parse(sessionStorage.getItem('class-work'));
      this.view = true;
      this.clipnote = false;
    } else {
      this.view = false;
      this.clipnote = true;
    }
  }

  changeText(id) {
    if (id) {
      this.changetext = false;
    }
  }

  reverseText(id) {
    if (id) {
      this.changetext = true;
    }
  }

}



