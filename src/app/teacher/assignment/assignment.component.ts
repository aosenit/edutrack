import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  createAssignmentmentForm: FormGroup;
  classList: any;
  subjectList: any;
  studentAssignmentList: any;
  id: any;
  constructor(
    private assignmentService: AssignmentService,
    private teacherService: TeacherService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // (this.id);
    this.getAssignmentSubmission();
  }


  getAssignmentSubmission() {
    this.teacherService.getAllAssignmentSubmissionForASubject(this.id).subscribe((data: any) => {
      // (data);
      if (data.hasErrors === false) {
        // ('asasasa', data);
        this.studentAssignmentList = data.payload;
      }
    }, error => {
      // (error);
    });
  }


  gradeAssignment(i) {
    sessionStorage.setItem('preview-assignment', JSON.stringify(this.studentAssignmentList[i]));

  }

  previewAssignment(i) {
    // // (this.route.snapshot);
    // routerLink = ""
    sessionStorage.setItem('preview-assignment', JSON.stringify(this.studentAssignmentList[i]));
    this.router.navigateByUrl('/teacher/preview-assignment/' + this.id);
  }

  back() {
    window.history.back();
  }

}
