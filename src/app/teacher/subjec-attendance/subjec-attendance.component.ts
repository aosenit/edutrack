import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';

@Component({
  selector: 'app-subjec-attendance',
  templateUrl: './subjec-attendance.component.html',
  styleUrls: ['./subjec-attendance.component.css']
})
export class SubjecAttendanceComponent implements OnInit {
  noClass = true;
  displayClass = false;
  classList: any;
  subjectList: any[];
  constructor(
    private classService: ClassService,

  ) { }

  ngOnInit() {
    this.getClassAndSubjectForTeacher();
  }

  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.classList = data.payload;
        // (this.classList);
      }
    }
    );
  }

  getSubjectsId(id) {
    // ('Subject ID here', id);
    // this.Subjectid = id;
  }

  getSubjects(id) {
    this.noClass = false;
    this.displayClass = true;
    // (id);
    const selectedClass = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i].class === id) {
        selectedClass.push(this.classList[i]);
      }
    }
    // (selectedClass);
    this.subjectList = selectedClass;

  }

  saveClass(i) {
   const subjectClass = this.subjectList[i];
   sessionStorage.setItem('subject-class', JSON.stringify(subjectClass));
  }
}
