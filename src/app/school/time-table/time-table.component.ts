import { getLocaleFirstDayOfWeek } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  addCell = {periodId: '', day: '', teacherClassSubjectId: '', HasVirtual: false};
  constructor(
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private timeTableService: TimeTableService
  ) { }

  ngOnInit() {
    this.getSchoolSection();
    this.getClasses();
    this.getAllPeriods();
    this.daysofWeek();
    // this.deleteTableCell();
  }

  getSchoolSection() {
    this.schoolSectionService.getSection().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }

  getClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classes = data.payload;
      }
    });
  }

  getSubjectsByClassId(id) {
    console.log(id);
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
      }
    }
    );

    this.timeTableService.getTimeTableForClass(id).subscribe((data: any) => {
      console.log(data);
    });
  }


  getTeacherBySubjectId(id) {
    console.log(id);
    this.classService.getTeacherTeachingSubject(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teachersList = data.payload;
        console.log(data);
      }
    }
    );

  }


  getAllPeriods() {
    this.timeTableService.getPeriods().subscribe((data: any) => {
      if (data.hasErrors === false) {
        sessionStorage.setItem('periods', JSON.stringify(data.payload));
        this.periods = data.payload;
        console.log(this.periods);
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
    console.log(this.days);
  }

  getDay(id, periodid) {
    console.log(id);
    this.addCell.day = id;
    this.addCell.periodId = periodid;
  }
  checkVirtual(event) {

  }

  addCellToTimeTable() {
    console.log(this.addCell);
    setTimeout(() => {
      document.getElementById('exampleModalCenterLevel').click();
    }, 1000);
  }

  createTimeTableCell() {
    const {periodId, day, teacherClassSubjectId, HasVirtual} = this.addCell;
    // tslint:disable-next-line:radix
    const TeacherClassSubjectId = parseInt(teacherClassSubjectId);
    // tslint:disable-next-line:radix
    const PeriodId = parseInt(periodId);
    // tslint:disable-next-line:radix
    const Day = parseInt(day);
    const result = {
      PeriodId,
      Day,
      TeacherClassSubjectId,
      HasVirtual,
      // NoOfPeriod: 1
    };
    console.log(result);
    this.timeTableService.AddTimeTableCell(result).subscribe((data: any) => {
      console.log(data);
    });
  }

  // deleteTableCell() {
  //   this.timeTableService.deleteTimeTableCell().subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }

}
