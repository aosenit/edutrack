import { getLocaleFirstDayOfWeek, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, zip, of } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';


@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
  sections: any;
  classes: any;
  periods: any;
  subjectList: any;
  teachersList: any;
  days: any;
  timeTableCells: any;
  timeTable: any;
  timetable2: any;
  addCell = { periodId: '', day: '', teacherClassSubjectId: '', HasVirtual: false };
  hideImg = false;
  checkPushlishStatus: any;
  tableCells = [];
  mirrowTableCells = [];
  selectedTeacher: any;
  timetableCellForm: FormGroup;
  constructor(
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private timeTableService: TimeTableService,
    private notifyService: NotificationsService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getSchoolSection();
    // this.getClasses();
    this.getAllPeriods();
    this.daysofWeek();
    console.log(this.checkPushlishStatus);
    this.initTimeTableCellForm();
    // this.deleteTableCell();

  }

  initTimeTableCellForm() {
    this.timetableCellForm = this.fb.group({
      periodId: ['', Validators.required],
      day: ['', Validators.required],
      teacherClassSubjectId: ['', Validators.required],
      subjectName: [''],
      teacherName: [''],
      periodName: [''],
      hasVirtual: false
    });
  }

  getSchoolSection() {
    this.schoolSectionService.getSection().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }

  getClassBySectionId(id) {
    // (id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classes = data.payload;

      }
    });

  }


  // getClasses() {
  //   this.classService.getAllClasses().subscribe((data: any) => {
  //     if (data.hasErrors === false) {
  //       this.classes = data.payload;
  //       // (this.classes);
  //     }
  //   });
  // }

  getSubjectsByClassId(id) {
    // (id);
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;

      }
    }
    );

    this.timeTableService.getTimeTableForClassWithQuery(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.timeTableCells = data.payload;
        // // (this.timeTableCells);
        // const tables = [];

        // from(this.timeTableCells)
        //   .pipe(
        //     groupBy(
        //       (result: any) => result.periodName.split('_')[0]
        //     ),
        //     mergeMap(group => zip(of(group.key), group.pipe(toArray())))
        //   )
        //   .subscribe(xy => {
        //     tables.push(xy);
        //   });
        // this.timeTable = tables;
        // // ('time table', this.timeTable[0]);  teacherClassSubjectId

      }
    });
  }




  getTeacherBySubjectId(e) {

    this.timetableCellForm.controls.subjectName.setValue(this.subjectList[e].subject);
    const id = this.subjectList[e].id;
    // (id);
    this.classService.getTeacherTeachingSubject(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teachersList = data.payload;
        // (data);
      }
    }
    );

  }


  setTeacherData(e) {
    this.timetableCellForm.controls.teacherClassSubjectId.setValue(this.teachersList[e].id);
    this.timetableCellForm.controls.teacherName.setValue(this.teachersList[e].teacher);

  }

  getAllPeriods() {
    this.timeTableService.getPeriods().subscribe((data: any) => {
      if (data.hasErrors === false) {
        sessionStorage.setItem('periods', JSON.stringify(data.payload));
        this.periods = data.payload;
        // (this.periods);
      }
    });
  }

  daysofWeek() {
    this.days = [
      { id: 0, day: 'Monday' },
      { id: 1, day: 'Tuesday' },
      { id: 2, day: 'Wednesday' },
      { id: 3, day: 'Thursday' },
      { id: 4, day: 'Friday' },
    ];
  }

  getDay(id, periodid, name) {

    this.timetableCellForm.controls.periodId.setValue(periodid);
    this.timetableCellForm.controls.day.setValue(id);
    this.timetableCellForm.controls.periodName.setValue(name);
    this.addCell.day = id;
    this.addCell.periodId = periodid;
    // this.hideImg = true;
  }
  checkVirtual(event) {

  }

  // getTeacherDetails(e) {
  //   this.selectedTeacher = this.teachersList[e].id;
  // }

  addCellToTimeTable() {
    
    const { periodId, day, teacherClassSubjectId, hasVirtual } = this.timetableCellForm.value;
    const result = {
      periodId,
      day,
      teacherClassSubjectId: parseInt(teacherClassSubjectId),
      HasVirtual: hasVirtual
    };
    this.tableCells.push(result);
    console.log(this.tableCells)
    this.timetableCellForm.controls.teacherClassSubjectId.setValue('');
    this.timetableCellForm.controls.hasVirtual.setValue(false);
    sessionStorage.setItem('publish', JSON.stringify(this.addCell));
    sessionStorage.setItem('saveTableCell', JSON.stringify(this.timetableCellForm.value));
    setTimeout(() => {
      this.checkPushlishStatus = JSON.parse(sessionStorage.getItem('publish'));

      document.getElementById('exampleModalCenterLevel').click();
    }, 1000);
    const idontire = JSON.parse(sessionStorage.getItem('saveTableCell'))
    this.timeTableCells.push(idontire);
    // sessionStorage.removeItem('publish');
  }

  createTimeTableCell() {
    // const { periodId, day, teacherClassSubjectId, HasVirtual } = this.addCell;
    // const TeacherClassSubjectId = parseInt(teacherClassSubjectId);
    // const PeriodId = parseInt(periodId);
    // const Day = parseInt(day);
    // const result = {
    //   PeriodId,
    //   Day,
    //   TeacherClassSubjectId,
    //   HasVirtual,
    //   // NoOfPeriod: 1
    // };
    this.timeTableService.AddTimeTableCellBulk(this.tableCells).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        sessionStorage.setItem('table', JSON.stringify(data.payload));
        this.notifyService.publishMessages('Upload successfull', 'success', 1);
        sessionStorage.removeItem('publish');
        location.reload();

        this.addCell = { periodId: '', day: '', teacherClassSubjectId: '', HasVirtual: false };


      } else if (data.hasErrors === true) {
        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  // deleteTableCell() {
  //   this.timeTableService.deleteTimeTableCell().subscribe((data: any) => {
  //     // (data);
  //   });
  // }

}
