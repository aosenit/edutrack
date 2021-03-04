import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/services/data/class/class.service';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent implements OnInit {
  classList: any;
  noClass = true;
  displayClass = false;
  studentList: any;
  attendanceForm: any;
  toggleState: number;
  studentModel = {};
  date: string;
  attendanceStructure = { dates: '',  };
  studentID: any;
  studentModels: {};
  studentAttendanceVMs = [];
  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private fb: FormBuilder

  ) { }

  ngOnInit() {
    this.getClassAndSubjectForTeacher();

    this.populateAttendance();
  }

  populateAttendance() {
    this.attendanceForm = this.fb.group({
      attendanceStatus: true
    });
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

  }

  getSubjects(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i].classId === id) {
       console.log('assas', this.classList[i]);
      }
    }
    this.classService.getStudentsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.studentList = data.payload;
        console.log(this.classList);
      }
    });

  }

 

  back() {
    window.history.back();
  }

  getElementId(event) {
    console.log(event);
  }

  getStatus(event, id, i) {
    this.studentID = id;
    if (event === true) {
      this.toggleState = 1;
    } else {
      this.toggleState = 2;

    }


    this.studentModel[i] = {
      studentId: id,
      attendanceStatus: this.toggleState,
      remark: 'string'
     };

    this.studentAttendanceVMs.push(this.studentModel[i]);

  }

  submitAttendance() {
    const {dates} = this.attendanceStructure;
    const result =  {
      subjectId: 0,
      date : dates,
      studentAttendanceVMs : this.studentAttendanceVMs
    };

    console.log(result);
  }
}
