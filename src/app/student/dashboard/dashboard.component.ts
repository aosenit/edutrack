import { Component, OnInit } from '@angular/core';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private timeTableService: TimeTableService,
    private assignmentService: AssignmentService
  ) { }

  ngOnInit() {
    this.getTimeTableByClass();
    this.getAssignmentByClass();
  }

  showPop() {
    const popcard = document.querySelector('.pop-card-holder');
    popcard.classList.toggle('show-pop');
  }

  getTimeTableByClass() {
    const classId = 25;
    this.timeTableService.getTimeTableForClass(classId).subscribe((data: any) => {
      if (data.hasErrors === false ) {
        console.log(data);
        // this.timeTableCells = data.payload;
        // const tables = [];

        // from(this.timeTableCells)
        //  .pipe(
        //    groupBy(
        //      (result: any) => result.periodName.split('_')[0]
        //    ),
        //    mergeMap(group => zip(of(group.key), group.pipe(toArray())))
        //  )
        //  .subscribe(xy => {
        //    console.log('Periods', ...xy);
        //    tables.push(xy);
        //   });
        // this.timeTable = tables;
        // console.log('time table', this.timeTable);
      }
    });
  }

  getAssignmentByClass() {
    const classId = 25;

    this.assignmentService.getAssignmentByClass(classId).subscribe((data: any) => {
      console.log('sasasasas', data);
      if (data.hasErrors === false) {
        // console.log(data);
      }
    });
  }

}
