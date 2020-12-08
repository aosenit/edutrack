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
  p = 1;
  itemsPerPage = 5;
  assignmentCount: number;
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
    this.assignmentService.getAssignmentByTeacher(this.p, this.itemsPerPage).subscribe((data: any) => {
      console.log(data);
      if (data.hasErrors === false) {
        console.log('asasasa', data);
        this.assignmentLists = data.payload.reverse();
        this.assignmentCount = data.totalCount;
      }
    }, error => {
      console.log(error);
    });
  }

  getPage(page: number) {
    console.log(page);
    this.assignmentService.getAssignmentByTeacher(page, this.itemsPerPage).subscribe((data: any) => {
      console.log(data);
      if (data.hasErrors === false) {
        console.log('asasasa', data);
        this.assignmentLists = data.payload;
        this.assignmentCount = data.totalCount;
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
