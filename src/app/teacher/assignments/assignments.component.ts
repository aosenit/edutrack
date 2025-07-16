import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material';
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
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
  searchField!: FormControl;
  p = 1;
  itemsPerPage = 5;
  assignmentCount: number;
  changetext: any;
  assignment = {};
  selectedSubject: any;

  individualCheckbox: any;

  constructor(
    private assignmentService: AssignmentService,
    private notifyService: NotificationsService,

  ) {
      this.searchField = new FormControl();
      this.searchField.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(term => {
        this.p = 1;
        this.getAssignmentByTeacher();
      });
  }


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

  getPage(event: PageEvent) {
    let { pageIndex } = { ...event };
    this.p = pageIndex + 1;
    this.getAssignmentByTeacher();
  }

  getAssignmentByTeacher() {
    this.assignmentService.getAssignmentByTeacher(this.p, this.itemsPerPage, this.searchField.value).subscribe((data: any) => {
      if (data) {
        this.assignmentLists = data.payload;
        this.assignmentCount = data.totalCount;
        // this.clientList.reverse();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

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

  getElementId(event, i) {
    if (event === true) {
      this.view = true;
      this.selectedSubject = this.assignmentLists[i];
      this.clipnote = false;
    } else {
      this.view = false;
      this.clipnote = true;
    }
  }


  selectAllCheckbox(event : any ){
    if(event === true){
      document.querySelectorAll('.individual-checkbox').forEach((item: any) => item.checked = true)
    } else {
      document.querySelectorAll('.individual-checkbox').forEach((item: any) => item.checked = false)
    }
  }

}
