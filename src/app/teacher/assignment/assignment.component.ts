import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { SubjectService } from 'src/services/data/subject/subject.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {

  createAssignmentmentForm: FormGroup;
  classList: any;
  subjectList: any;
  constructor(
    private assignmentService: AssignmentService,
  ) { }

  ngOnInit() {
    // this.getAssignmentByTeacher();
  }


  // getAssignmentByTeacher() {
  //   this.assignmentService.getAssignmentByTeacher().subscribe((data: any) => {
  //     console.log(data);
  //     if (data.hasErrors === false) {
  //       console.log('asasasa', data);
  //     }
  //   }, error => {
  //     console.log(error);
  //   });
  // }

  back() {
    window.history.back();
  }

}
