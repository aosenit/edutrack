import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from 'src/services/data/class/class.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';

@Component({
  selector: 'app-create-assignment',
  templateUrl: './create-assignment.component.html',
  styleUrls: ['./create-assignment.component.css']
})
export class CreateAssignmentComponent implements OnInit {
  public Editor = ClassicEditor;
  createAssignmentmentForm: FormGroup;
  classList: any;
  subjectList: any;
  assignmentFile = null;
  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private classService: ClassService,
    private assignmentService: AssignmentService,
    private notifyService: NotificationsService,

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
    this.getAllClasses();
  }


  // getAllsubjects() {
  //   this.subjectService.getAllSubjects().subscribe((data: any) => {
  //     if (data.hasErrors === false) {
  //       this.subjectList = data.payload;
  //       console.log(this.subjectList);
  //     }
  //   });
  // }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classList = data.payload;
        // console.log(this.classList);
      }
    }
    );
  }

  getSubjects(id) {
    console.log(id);
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
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
      this.createAssignmentmentForm.get('Document').setValue(file);
      // this.iconname = this.icon.name;
    }
  }

  submitAssignment() {
    const {Title, subjectId, assDate, assTime, TotalScore, Document} = this.createAssignmentmentForm.value;
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
        console.log(data);
        this.notifyService.publishMessages('Assignment created successfully', 'info', 1);

      }
    }
    );
  }


  convertFile(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
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
