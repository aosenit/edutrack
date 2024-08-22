import { JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ClassWorkService } from 'src/services/data/class-work/class-work.service';
import { LessonNoteService } from 'src/services/data/lesson-note/lesson-note.service';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent implements OnInit, OnDestroy {
id: any;
fileDetails: any;
savedDetails: any;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private notifyService: NotificationsService,
    private lessonNoteService: LessonNoteService,
    private classWorkServie: ClassWorkService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // (this.id);
    this.getPreviewDetails();
  }

  getPreviewDetails() {
    this.savedDetails = JSON.parse(sessionStorage.getItem('student-assignment'));
    if (this.savedDetails.type !== undefined && this.savedDetails.type === 'Lesson Note') {
      this.getLessonNoteDetails();
    } else if (this.savedDetails.type !== undefined && this.savedDetails.type === 'Classwork') {
      this.getClassWorkDetails();
    } else {
      this.getAssignmentDetails();
    }



  }

  getAssignmentDetails() {
    this.assignmentService.getAssignmentDetails(this.id).subscribe(
      (data: any) => {
        if (data.hasErrors === false) {
          // ('assignment Notes', data);
          this.fileDetails = data.payload;

        }
      },
      (error) => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);
      }
    );
  }

  getLessonNoteDetails() {
    this.lessonNoteService.getSinglelessonNoteDetail(this.id).subscribe(
      (data: any) => {
        if (data.hasErrors === false) {
          // ('assignment Notes', data);
          this.fileDetails = data.payload;

        }
      },
      (error) => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);
      }
    );
  }

  getClassWorkDetails() {
    this.classWorkServie.getClassWorkDetails(this.id).subscribe(
      (data: any) => {
        if (data.hasErrors === false) {
          // ('assignment Notes', data);
          this.fileDetails = data.payload;

        }
      },
      (error) => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);
      }
    );
  }

  downloadFile() {
    if (this.fileDetails.fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ) {

      const link = document.createElement('a');
      link.download = `${this.fileDetails.fileName}.docx`;
      link.href = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + this.fileDetails.file;
      link.click();
    } else {

      const link = document.createElement('a');
      link.download = `${this.fileDetails.fileName}.docx`;
      link.href = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + this.fileDetails.file;
      link.click();
    }

  }

  back() {
    window.history.back();
  }

  ngOnDestroy() {
    sessionStorage.removeItem('student-assignment');
  }

}
