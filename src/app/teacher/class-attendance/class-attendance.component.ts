import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/services/data/attendance/attendance.service';
import { ClassService } from 'src/services/data/class/class.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import * as $ from 'jquery';
import * as moment from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';



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
  todayDate: Date = new Date();
  invalidate: true;
  presentSummary = 0;
  absentSummary = 0;



  attendanceStructure = {dates: '',  attendanceStatus: Boolean, absentRemark: '' };
  studentID: any;
  TeacherClassId: any;
  loggedInUser: any;

  constructor(
    private classService: ClassService,
    private attendance: AttendanceService,
    private fb: FormBuilder,
    private notifyService: NotificationsService,



  ) { }

  ngOnInit() {
    const helper = new JwtHelperService();
    this.loggedInUser = helper.decodeToken(localStorage.getItem('access_token'));
    console.log(this.loggedInUser.TeacherClassId);
    // this.TeacherClassId = sessionStorage.getItem('class-id');
    // tslint:disable-next-line:only-arrow-functions
    $('#dropdownMenuLink').on('show.bs.dropdown', function() {
      $(`#dropdownMenuLink`).show();

    });

    this.getClassAndSubjectForTeacher();
    this.getSubjects();
    this.populateAttendance();
    this.getClassAttendanceSummary();

  }

  populateAttendance() {
    this.attendanceForm = this.fb.group({
      attendanceStatus: true,
      dates: [, Validators.required],
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

  getSubjects() {

    this.classService.getStudentsInAClassByClassID(this.loggedInUser.TeacherClassId).subscribe((data: any) => {
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
      classId: parseInt(this.loggedInUser.TeacherClassId),
      date: dates,
      studentAttendanceVMs: this.studentAttendanceVMs
    };

    console.log(result);
    this.attendance.createClassAttendance(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.notifyService.publishMessages('Attendance saved', 'success', 1);
        this.getClassAttendanceSummary();
        // this.studentList = data.payload;
        // console.log(this.classList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getClassAttendanceSummary() {
    this.attendance.getClassAttendanceForTeacher(this.loggedInUser.TeacherClassId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        const attendee: any = data.payload;
        const present = [];
        const absent = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < attendee.length; i++) {
          const day = moment();
          const today = day.format('YYYY-MM-DD');
          attendee[i].attendanceClassVms.forEach(element => {
                    // const todaysUsers = users.filter((status: any) => moment(status.createdAt).format('YYYY-MM-DD') ===  today);

           console.log(element);
           if (today === moment(element.attendanceDate).format('YYYY-MM-DD') && element.attendanceStatus === 1) {
            present.push(element.attendanceStatus);
            this.presentSummary = present.length;
            // this.presentSummary = present.length;

           } else if (today === moment(element.attendanceDate).format('YYYY-MM-DD') && element.attendanceStatus === 2) {
            absent.push(element.attendanceStatus);
            this.absentSummary = absent.length;
            // this.absentSummary = absent.reduce((a, b) => a + b, 0);
           }
         });
        }
      }
    });
  }

}
