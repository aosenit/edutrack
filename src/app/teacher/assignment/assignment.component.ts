import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getAssignmentSubmission();
  }


  getAssignmentSubmission() {
    this.teacherService.getAllAssignmentSubmissionForASubject(this.id).subscribe((data: any) => {
      console.log(data);
      if (data.hasErrors === false) {
        console.log('asasasa', data);
        this.studentAssignmentList = data.payload;
      }
    }, error => {
      console.log(error);
    });
  }

  back() {
    window.history.back();
  }

}
