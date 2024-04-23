import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
subjectList: object;
  constructor(
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.getAllSubjects();

  }



  getAllSubjects() {
    // const classId = 25;
    this.classService.getAllSubjectsInAClassWithAssignmentCountByClassID().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        // (data);
        this.subjectList = data.payload;
      }
    });
  }

}
