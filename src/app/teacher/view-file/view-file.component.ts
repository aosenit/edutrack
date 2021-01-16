import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ClassWorkService } from 'src/services/data/class-work/class-work.service';
import { LessonNoteService } from 'src/services/data/lesson-note/lesson-note.service';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css'],
})
export class ViewFileComponent implements OnInit {
  id: any;
  fileDetails: any;
  constructor(
    private route: ActivatedRoute,
    private lessonNoteService: LessonNoteService,
    private notifyService: NotificationsService,
    private assignmentService: AssignmentService,
    private classWorkService: ClassWorkService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getFileDetails();
  }

  back() {
    window.history.back();
  }

  getFileDetails() {
    const currentpath = this.route.snapshot.url[0].path; // get current path to know which endpoint to use
    if (currentpath === 'lesson-note') {
      this.lessonNoteService.getSinglelessonNoteDetail(this.id).subscribe(
        (data: any) => {
          if (data.hasErrors === false) {
            console.log('lesson Notes', data);
            this.fileDetails = data.payload;
          }
        },
        (error) => {
          this.notifyService.publishMessages(error.errors, 'danger', 1);
        }
      );
    } else if (currentpath === 'assignment-note') {
      this.assignmentService.getAssignmentDetails(this.id).subscribe(
        (data: any) => {
          if (data.hasErrors === false) {
            console.log('assignment Notes', data);
            this.fileDetails = data.payload;
          }
        },
        (error) => {
          this.notifyService.publishMessages(error.errors, 'danger', 1);
        }
      );
    } else {
      this.classWorkService.getClassWorkDetails(this.id).subscribe(
        (data: any) => {
          if (data.hasErrors === false) {
            console.log('class work', data);
            this.fileDetails = data.payload;
          }
        },
        (error) => {
          this.notifyService.publishMessages(error.errors, 'danger', 1);
        }
      );
    }
  }
}
