import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  view = false;
  clipnote = true;
  assignmentLists: any;
  searchString: string;
  changetext = true;

  constructor(
    private assignmentService: AssignmentService,

  ) { }

  ngOnInit() {
    this.getAssignmentByTeacher();
  }

  changeText(id) {
    if (id) {
      this.changetext = false;
    }
  }

  reverseText(id) {
    if (id) {
      this.changetext = true;
    }
  }


  getAssignmentByTeacher() {
    this.assignmentService.getAssignmentByTeacher().subscribe((data: any) => {
      console.log(data);
      if (data.hasErrors === false) {
        console.log('asasasa', data);
        this.assignmentLists = data.payload;
      }
    }, error => {
      console.log(error);
    });
  }

  checked(event) {
    if (event === true) {
      this.view = true;
      this.clipnote = false;
    } else {
      this.view = false;
      this.clipnote = true;
    }
  }

  getElementId(event) {
    console.log(event);
  }

}
