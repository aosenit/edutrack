import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

  }



}
