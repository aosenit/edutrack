import { getLocaleFirstDayOfWeek, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  constructor(
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private timeTableService: TimeTableService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.getSchoolSection();
    // this.getClasses();
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
      if (data.hasErrors === false ) {
        this.timeTableCells = data.payload;
        // (this.timeTableCells);
        const tables = [];

        from(this.timeTableCells)
         .pipe(
           groupBy(
             (result: any) => result.periodName.split('_')[0]
           ),
           mergeMap(group => zip(of(group.key), group.pipe(toArray())))
         )
         .subscribe(xy => {
           tables.push(xy);
          });
        this.timeTable = tables;
        // ('time table', this.timeTable[0]);

      }
    });
  }




  getTeacherBySubjectId(id) {
    // (id);
    this.classService.getTeacherTeachingSubject(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teachersList = data.payload;
        // (data);
      }
    }
    );

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

  getDay(id, periodid) {
    // ('id', id);
    // ('period', periodid);
    this.addCell.day = id;
    this.addCell.periodId = periodid;
    // this.hideImg = true;
  }
  checkVirtual(event) {

  }

  addCellToTimeTable() {
    // (this.addCell);
    setTimeout(() => {
      document.getElementById('exampleModalCenterLevel').click();
    }, 1000);
  }

  createTimeTableCell() {
    const { periodId, day, teacherClassSubjectId, HasVirtual } = this.addCell;
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
    // (result);
    this.timeTableService.AddTimeTableCell(result).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        sessionStorage.setItem('table', JSON.stringify(data.payload));
        this.notifyService.publishMessages('Upload successfull', 'success', 1);
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
