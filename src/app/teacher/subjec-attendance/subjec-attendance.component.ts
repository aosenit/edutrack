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
        // console.log(data.payload);
        this.classList = data.payload;
        console.log(this.classList);
      }
    }
    );
  }

  getSubjectsId(id) {
    console.log('Subject ID here', id);
    // this.Subjectid = id;
  }

  getSubjects(id) {
    this.noClass = false;
    this.displayClass = true;
    console.log(id);
    const selectedClass = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i].class === id) {
        selectedClass.push(this.classList[i]);
      }
    }
    console.log(selectedClass);
    this.subjectList = selectedClass;

  }
}
