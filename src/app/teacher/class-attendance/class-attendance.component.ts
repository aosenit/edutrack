import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/services/data/attendance/attendance.service';
import { ClassService } from 'src/services/data/class/class.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import * as $ from 'jquery';


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
  studentList: any;
  date: string;

  attendanceForm: FormGroup;
  toggleState = 1;
  studentModels: {};
  studentAttendanceVMs = [];
  studentModel = {};


  attendanceStructure = {dates: '',  attendanceStatus: Boolean, absentRemark: '' };
  studentID: any;

  constructor(
    private classService: ClassService,
    private attendance: AttendanceService,
    private fb: FormBuilder,
    private notifyService: NotificationsService,



  ) { }

  ngOnInit() {
    // tslint:disable-next-line:only-arrow-functions
    $('#dropdownMenuLink').on('show.bs.dropdown', function() {
      $(`#dropdownMenuLink`).show();

    });

    this.getClassAndSubjectForTeacher();
    this.populateAttendance();
  }

  populateAttendance() {
    this.attendanceForm = this.fb.group({
      attendanceStatus: true,
      dates: ['', Validators.required],
      class: '',
      Remark: ''
    });
  }

  getSubjectsId(id) {
    console.log('Subject ID here', id);
    // this.Subjectid = id;
    this.noClass = false;
    this.displayClass = true;
  }

  getSubjects(id) {
    this.classID = id;
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
        const {Remark} = this.attendanceForm.value;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.studentList.length; i++) {
          this.studentModel[i] = {
            studentId: this.studentList[i].id,
            attendanceStatus: this.toggleState,
            remark: Remark
          };

          this.studentAttendanceVMs.push(this.studentModel[i]);
        }
      }
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


  getAttendanceForClass() {
    this.attendance.getAssignmentByTeacher().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.classList = data.payload;
        console.log(this.classList);
      }
    });
  }


  getStatus(event, id, i) {
    console.log(event);
    this.studentID = id;
    this.toggleState = 1;
    if (event.target.checked === true) {
      this.toggleState = 1;
      this.studentModel[i] = {
        studentId: id,
        attendanceStatus: this.toggleState,
        remark: ''
      };

      this.studentAttendanceVMs.push(this.studentModel[i]);


    } else {
      this.toggleState = 2;
      document.getElementById('absentDrop' + `${i}`).click();
      $(`#dropdownMenuLink${i}`).toggleClass('show-pop');
      const {Remark} = this.attendanceForm.value;
      this.studentModel[i].remark = Remark;
      this.studentAttendanceVMs = this.studentAttendanceVMs.map((status: any) => {
        // tslint:disable-next-line:curly
        if (this.studentID === status.studentId) return { ...status, attendanceStatus: this.toggleState };
        return status;
      });
    }

  }

  getAssessmentName(event, u) {
    $(`#dropdownMenuLink${u}`).addClass('show-pop');

  }

  holdDropDown(u) {
    $(`#dropdownMenuLink${u}`).addClass('show-pop');

  }

  closeDropdown(u) {
    $(`#dropdownMenuLink${u}`).removeClass('show-pop');

  }


  submitAttendance() {


    const { dates } = this.attendanceForm.value;

    const result = {
      classId: parseInt(this.classID),
      date: dates,
      studentAttendanceVMs: this.studentAttendanceVMs
    };

    console.log(result);
    this.attendance.createClassAttendance(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.notifyService.publishMessages('Attendance saved', 'success', 1);
        location.reload();
        // this.studentList = data.payload;
        // console.log(this.classList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'success', 1);

    });
  }

}
