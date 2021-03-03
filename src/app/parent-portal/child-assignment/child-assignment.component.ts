import { Component, OnInit } from '@angular/core';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-child-assignment',
  templateUrl: './child-assignment.component.html',
  styleUrls: ['./child-assignment.component.css']
})
export class ChildAssignmentComponent implements OnInit {
  subjectList: any;
  wardDetail: any;
  assignmentCount = 0;

  constructor(
    private parentService: ParentsService,


  ) { }

  ngOnInit() {
    this.wardDetail = JSON.parse(sessionStorage.getItem('ward'));

    this.getAllSubjects();
  }


  getAllSubjects() {
    // const classId = 25;
    this.parentService.getAllSubjectsInAClassWithAssignmentCountByClassID(this.wardDetail.classID).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        console.log(data);
        this.subjectList = data.payload;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.subjectList.length; i++) {
          this.assignmentCount += this.subjectList[i].assignmentCount;
        }
      }
    });
  }

}
