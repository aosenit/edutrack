import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AttendanceService } from 'src/services/data/attendance/attendance.service';
import { ClassService } from 'src/services/data/class/class.service';
import * as $ from 'jquery';
import { TeacherService } from 'src/services/data/teacher/teacher.service';
import * as moment from 'moment';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
  toggleState = 1;
  studentModel = {};
  date: string;
  attendanceStructure = { dates: '', attendanceStatus: true, absentRemark: '' };
  studentID: any;
  studentModels: {};
  studentAttendanceVMs = [];
  subjectClass: any;
  todayDate: Date = new Date();
  invalidate: true;

  constructor(
    private classService: ClassService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private attendance: AttendanceService,
    private notifyService: NotificationsService,
    private teacher: TeacherService


  ) { }

  ngOnInit() {
      // tslint:disable-next-line:only-arrow-functions
      $('#dropdownMenuLink').on('show.bs.dropdown', function() {
        $(`#dropdownMenuLink`).show();

      });
      this.getClassAndSubjectForTeacher();

      this.populateAttendance();
      this.subjectClass = JSON.parse(sessionStorage.getItem('subject-class'));
      // // (this.subjectClass);
      this.getSubjectAttendance();


  }

  populateAttendance() {
    this.attendanceForm = this.fb.group({
      attendanceStatus: true,
      dates: ['', Validators.required],
      class: '',
      Remark: ''
    });
  }

  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // // (data.payload);
        this.classList = data.payload;
        // // (this.classList);
      }
    }
    );
  }

  getSubjectsId(id) {
    // ('Subject ID here', id);

  }

  getSubjects(id) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.classList.length; i++) {
      if (this.classList[i].classId === id) {
        // // ('assas', this.classList[i]);
      }
    }
    this.classService.getStudentsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        this.studentList = data.payload;
        const {Remark} = this.attendanceForm.value;

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



  back() {
    window.history.back();
  }

  getElementId(event) {
    // (event);
  }

  getStatus(event, id, i) {
    // (event);
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

      this.studentAttendanceVMs = this.studentAttendanceVMs.map((status: any) => {
        // tslint:disable-next-line:curly
        if (this.studentID === status.studentId) return { ...status, attendanceStatus: this.toggleState };
        return status;
      });
      const {Remark} = this.attendanceForm.value;
      this.studentModel[i].remark = Remark;
      // // (this.studentModel[i].remark);
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
    const {Remark} = this.attendanceForm.value;
    this.studentModel[u].remark = Remark;
    // (this.studentModel[u].remark);

  }

  compareDate(e) {
    const day = moment();
    const today = day.format('YYYY-MM-DD');
    if (e !== today) {
      this.notifyService.publishMessages( `You can only pick today's date`, 'danger', 1);
      // this.attendanceForm.invalid = true;
    } else {
      this.invalidate = true;
    }
  }

  submitAttendance() {
    const { dates } = this.attendanceForm.value;
    const result = {
      subjectId: this.subjectClass.subjectId,
      date: dates,
      studentAttendanceVMs: this.studentAttendanceVMs
    };

    // (result);
    this.attendance.createSubjectAttendance(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        this.notifyService.publishMessages('Attendance saved', 'success', 1);
        // this.studentList = data.payload;
        // // (this.classList);
      } else {
        this.notifyService.publishMessages(data.errors, 'success', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getSubjectAttendance() {
    // this.attendance.getSubjectAttendance(this.subjectClass.classSubjectId).subscribe((data: any) => {
    this.teacher.getSubjectAttendance(this.subjectClass.subjectId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);

        // this.studentList = data.payload;
        // // (this.classList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'success', 1);

    });
  }
}

