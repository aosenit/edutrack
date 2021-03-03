import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/services/data/attendance/attendance.service';
import { ClassService } from 'src/services/data/class/class.service';

@Component({
  selector: 'app-class-attendance',
  templateUrl: './class-attendance.component.html',
  styleUrls: ['./class-attendance.component.css']
})
export class ClassAttendanceComponent implements OnInit {
  noClass = false;
  displayClass = true;
  classList: any;
  subjectList: any[];
  classID: any;
  constructor(
    private classService: ClassService,
    private atttendance: AttendanceService

  ) { }

  ngOnInit() {
    this.getClassAndSubjectForTeacher();
  }

  getSubjectsId(id) {
    console.log('Subject ID here', id);
    // this.Subjectid = id;
    this.noClass = false;
    this.displayClass = true;
  }

  getSubjects(id) {
   this.classID = id;
   this.getStudentInAClass(this.classID);
   const selectedClass = [];
    // tslint:disable-next-line:prefer-for-of
   for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i].classSubjectId === id) {
        selectedClass.push(this.classList[i]);
      }
    }
   console.log(selectedClass);
   this.subjectList = selectedClass;

  }

  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        this.classList = data.payload;
        console.log(this.classList);
      }
    }
    );
  }


  getAttendanceForClass() {
    this.atttendance.getAssignmentByTeacher().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.classList = data.payload;
        console.log(this.classList);
      }
    });
  }


  getStudentInAClass(classID) {
    this.classService.getStudentsInAClassByClassID(10007).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        // this.classList = data.payload;
        // console.log(this.classList);
      }
    });
  }

}
