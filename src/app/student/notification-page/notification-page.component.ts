import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import * as moment from 'moment';
@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit {
  public Editor = ClassicEditor;
  id: number;
  assignments: any;
  assignmentDetails: any;
  mydate: any;
  uploadAssignmentForm: FormGroup;
  assignmentFile = null;
  assignmentSubmission: any;
  constructor(
    private route: ActivatedRoute,
    private assignmentService: AssignmentService,
    private fb: FormBuilder,
    private notifyService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {

    this.populateAssignmentForm();
    this.id = this.route.snapshot.params.id;

    this.getClassSubjectAssignments();
    this.getStudentSubmissions();
  }

  populateAssignmentForm() {
    this.uploadAssignmentForm = this.fb.group({
      assimentId: [''],
      Document: ['']
    });
  }

  getClassSubjectAssignments() {
    this.assignmentService.getAssignmentsByClassSubject(this.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
          this.assignments = data.payload;
          // (this.assignments);
      }
      this.mydate = this.assignments.map((date) => {
        return moment(date.dueDate).fromNow();
      });
      // // (test);
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getStudentSubmissions() {
    this.assignmentService.getStudentAssignmentSubmission().subscribe((data: any) => {
      if (data.hasErrors === false) {
          this.assignmentSubmission = data.payload;
          // (this.assignmentSubmission);
      }
      // this.mydate = this.assignments.map((date) => {
      //   return moment(date.dueDate).fromNow();
      // });
      // // (test);
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }





  // calculateDiff(dateSent) {
  //   const currentDate = new Date();
  //   dateSent = new Date(dateSent);

  //    // tslint:disable-next-line:max-line-length
  // tslint:disable-next-line:max-line-length
  //   return Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) - Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate()) ) / (1000 * 60 * 60 * 24));
  //  }

  uploadAssignment(i, id) {
    this.assignmentDetails = this.assignments[i];
    // // (this.assignmentDetails.id);
    // sessionStorage.setItem('student-assignment', JSON.stringify(this.assignments[i]));

  }

  handleFileUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // ('file', file);
      this.assignmentFile = file.name;
      this.uploadAssignmentForm.get('Document').setValue(file);
      // this.iconname = this.icon.name;
    }
  }

  submitAssignment() {
    const {Document} = this.uploadAssignmentForm.value;
    // tslint:disable-next-line:radix
    const AssignmentId = parseInt(this.assignmentDetails.id);
    const result = {
      AssignmentId,
      Document
    };
    // (result);
    this.assignmentService.submitStudentAssignment(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.notifyService.publishMessages('Assignment submitted successfully', 'info', 1);
        document.getElementById('closeAssignmentModal').click();

      }
    });
  }

  openPreview(id, i) {
    this.router.navigateByUrl('/student/preview/' + id );
    this.assignmentDetails = this.assignments[i];
    sessionStorage.setItem('student-assignment', JSON.stringify(this.assignmentDetails));
  }




  back() {
    window.history.back();
  }

}
