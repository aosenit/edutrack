import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';

@Component({
  selector: 'app-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.css']
})
export class TaskPreviewComponent implements OnInit {
id: any;
fileDetails: any;
savedDetails: any;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // (this.id);
    this.getAssignmentDetails();
  }

  getAssignmentDetails() {
    this.assignmentService.getAssignmentDetails(this.id).subscribe(
      (data: any) => {
        if (data.hasErrors === false) {
          // ('assignment Notes', data);
          this.fileDetails = data.payload;
          this.savedDetails = JSON.parse(sessionStorage.getItem('student-assignment'));

        }
      },
      (error) => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);
      }
    );
  }

  back() {
    window.history.back();
  }

}
