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
  changetext: any;
  assignment = {};

  constructor(
    private assignmentService: AssignmentService,

  ) { }

  ngOnInit() {
    this.getAssignmentByTeacher();
  }

  changeText(i) {
    this.assignmentLists[i].status = 'Open';

  }

  reverseText(status, i) {
    // (status, i);
    // this.assignmentLists[i].status = status;

  }


  getAssignmentByTeacher() {
    this.assignmentService.getAssignmentByTeacher(this.p, this.itemsPerPage).subscribe((data: any) => {
      // (data);
      if (data.hasErrors === false) {
        // ('asasasa', data);
        this.assignmentLists = data.payload;
        this.assignmentCount = data.totalCount;
      }
    }, error => {
      // (error);
    });
  }

  getPage(page: number) {
    // (page);
    this.assignmentService.getAssignmentByTeacher(page, this.itemsPerPage).subscribe((data: any) => {
      // (data);
      if (data.hasErrors === false) {
        // ('asasasa', data);
        this.assignmentLists = data.payload;
        this.assignmentCount = data.totalCount;
      }
    }, error => {
      // (error);
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
    // (event);
  }

}
