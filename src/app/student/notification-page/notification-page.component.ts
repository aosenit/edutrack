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
          console.log(this.assignments);
      }
      this.mydate = this.assignments.map((ids) => {
        return moment(ids.dueDate).fromNow();
      });
      // console.log(test);
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
    console.log(this.assignmentDetails.id);
    sessionStorage.setItem('student-assignment', JSON.stringify(this.assignments[i]));

  }

  handleFileUpload(event: any) {
    const reader = new FileReader();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
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
    console.log(result);
    this.assignmentService.submitStudentAssignment(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.notifyService.publishMessages('Class note uploaded successfully', 'info', 1);
        document.getElementById('closeAssignmentModal').click();

      }
    });
  }

  openPreview(name, i) {
    this.router.navigateByUrl('/student/preview/' + name );
    this.assignmentDetails = this.assignments[i];
    console.log(this.assignmentDetails.id);
  }




  back() {
    window.history.back();
  }

}
