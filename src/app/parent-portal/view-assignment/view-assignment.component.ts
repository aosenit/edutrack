import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {
  assignments: any;
  mydate: any;
  id: number;
  wardDetail: any;
  assignmentCount = 0;
  assignmentSubmission: any;


  constructor(
    private route: ActivatedRoute,
    private parentService: ParentsService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getClassSubjectAssignments();
    this.wardDetail = JSON.parse(sessionStorage.getItem('ward'));
    this.getStudentSubmissions();

  }

  getClassSubjectAssignments() {
    this.parentService.getAssignmentsByClassSubject(this.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
          this.assignments = data.payload;
          console.log(this.assignments);
          const pending: any = this.assignments.filter((status: any) => status.status === 'Active');

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < pending.length; i++) {
            if (pending[i].status === 'Active') {
              this.assignmentCount++;
            }
          }
      }
      this.mydate = this.assignments.map((date) => {
        return moment(date.dueDate).fromNow();
      });
      // console.log(test);
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getStudentSubmissions() {
    this.parentService.getStudentAssignmentSubmission(this.wardDetail.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
          this.assignmentSubmission = data.payload;
          console.log(this.assignmentSubmission);
      }
      // this.mydate = this.assignments.map((date) => {
      //   return moment(date.dueDate).fromNow();
      // });
      // console.log(test);
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }


  back() {
    window.history.back();
  }
}
