import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { parse } from 'querystring';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
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
  uploadClassNoteForm: FormGroup;
  uploadAssignmentForm: FormGroup;
  classList: any;
  subjectsInClass: any;
  assignmentFile = null;

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private classService: ClassService,
    private lessonNoteService: LessonNoteService,
    private assignmentService: AssignmentService,
    private notifyService: NotificationsService,


  ) { }

  ngOnInit() {
    this.populateClassNoteForm();
    this.populateAssignmentForm();
    this.getAllClasses();
  }

  populateClassNoteForm() {
    this.uploadClassNoteForm = this.fb.group({
      classId: ['', Validators.required],
      subjectId: ['', Validators.required],
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

  checked(event) {
    if (event === true) {
      this.view = true;
      this.clipnote = false;
    } else {
      this.view = false;
      this.clipnote = true;
    }
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classList = data.payload;
        console.log(this.classList);
      }
    }
    );
  }

  getSubjects(id) {
    console.log(id);
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectsInClass = data.payload;
        console.log(this.subjectsInClass);
      }
    }
    );
  }

  handleFileUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.assignmentFile = file.name;
      this.uploadClassNoteForm.get('FileObj').setValue(file);
      // this.iconname = this.icon.name;
    }
  }
  handleAssignmentUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.assignmentFile = file.name;
      this.uploadClassNoteForm.get('FileObj').setValue(file);
      // this.iconname = this.icon.name;
    }
  }


  submitClassNote() {
    console.log(this.uploadClassNoteForm.value);
    const { subjectId, classId, FileObj } = this.uploadClassNoteForm.value;
    // tslint:disable-next-line:radix
    const SubjectId = parseInt(subjectId);
    // tslint:disable-next-line:radix
    const ClassId = parseInt(classId);
    const result = {
      SubjectId,
      ClassId,
      FileObj
    };
    this.lessonNoteService.addLessonNote(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.notifyService.publishMessages('Class note uploaded successfully', 'info', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    }
    );
  }

  submitAssignment() {
    const { Title, TeacherId, subjectId, classId, DueDate, TotalScore, Comment, Document } = this.uploadAssignmentForm.value;
    // tslint:disable-next-line:radix
    const SubjectId = parseInt(subjectId);
    // tslint:disable-next-line:radix
    const ClassId = parseInt(classId);
    const result = {
      Title,
      TeacherId,
      SubjectId,
      ClassId,
      DueDate,
      TotalScore,
      Comment,
      Document
    };
    this.assignmentService.addAssignment(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.notifyService.publishMessages('Assignment uploaded successfully', 'info', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    }
    );
  }

}



