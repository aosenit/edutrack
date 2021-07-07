import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from 'src/services/data/class/class.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { Router } from '@angular/router';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';


@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  public Editor = ClassicEditor;
  createAssignmentmentForm: FormGroup;
  classList: any;
  classList2: any;
  subjectList: any;
  filename = null;
  textToConvert = { text: '' };

  assignmentFile = null;
  data: string;
  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private classService: ClassService,
    private assignmentService: AssignmentService,
    private notifyService: NotificationsService,
    private router: Router

  ) { }

  ngOnInit() {
    this.createAssignmentmentForm = this.fb.group({
      Title: ['', Validators.required],
      subjectId: ['', Validators.required],
      assTime: ['', Validators.required],
      assDate: ['', Validators.required],
      TotalScore: ['', Validators.required],
      Document: null,
    });
    // this.getAllsubjects();
    // this.getAllClasses();
    this.getClassAndSubjectForTeacher();
  }


  // getAllsubjects() {
  //   this.subjectService.getAllSubjects().subscribe((data: any) => {
  //     if (data.hasErrors === false) {
  //       this.subjectList = data.payload;
  //       // (this.subjectList);
  //     }
  //   });
  // }

  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        const classList: any = data.payload;
        this.classList2 = data.payload;
        const newArr = [];

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < classList.length; i++) {
          newArr.push(classList[i].class);
        }
        // // (this.classList);
        this.classList = Array.from(new Set(newArr));
        // (this.classList);
      }
    }
    );
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classList = data.payload;
        // // (this.classList);
      }
    }
    );
  }

  getSubjects(id) {
    // (id);
    const selectedClass = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.classList2.length; i++) {
      if (this.classList2[i].class === id) {
        selectedClass.push(this.classList2[i]);
      }
    }
    // (selectedClass);
    this.subjectList = selectedClass;

  }

  onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    this.data = data;
    // (data);
  }


  handleFileUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // ('file', file);
      this.assignmentFile = file.name;
      this.createAssignmentmentForm.get('Document').setValue(file);
      // this.iconname = this.icon.name;
    }
  }

  submitAssignment() {
    const { Title, subjectId, assDate, assTime, TotalScore, Document } = this.createAssignmentmentForm.value;
    const DueDate = assDate + ' ' + assTime;
    // tslint:disable-next-line:radix
    // const SubjectId = parseInt(subjectId);
    // tslint:disable-next-line:radix
    const ClassSubjectId = parseInt(subjectId);
    // tslint:disable-next-line:radix
    const result = {
      Title,
      ClassSubjectId,
      DueDate,
      TotalScore,
      Document
    };

    this.assignmentService.addAssignment(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.notifyService.publishMessages('Assignment created successfully', 'info', 1);
        this.router.navigateByUrl('/teacher/assignments');
      }
    }
    );
  }


  convertFile(filename) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.data));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  back() {
    window.history.back();
  }

}
