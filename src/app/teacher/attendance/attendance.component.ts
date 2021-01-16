import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  noClass = false;
  classList: any;
  Classid: any;
  subjectList: any;
  className: any;
  Subjectid: any;
  displayClass: boolean;
  constructor(
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.getAllClasses();
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classList = data.payload;
        console.log(this.classList);
      }
    }
    );
  }

  getSubjects(id) {

    console.log('class id ', id);
    this.Classid = id;
    sessionStorage.setItem('class-id', this.Classid);
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
        // console.log(this.subjectList.subject);
      }
    }
    );

    this.classService.getClassById(id).subscribe((data: any) => {
      this.className = data.payload;
      console.log('Class Name', this.className.name);
    });

    // this.resultService.getStudentandAssement(1).subscribe((data: any) => {
    //   console.log('wahala', data);
    // });

  }

  getSubjectsId(id) {
    console.log('Subject ID here', id);
    this.Subjectid = id;
    this.noClass = false;
    this.displayClass = true;
  }

}
