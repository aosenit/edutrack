import { Component, OnInit } from '@angular/core';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  subjectAndTime: any;
  constructor(
    private timeTableService: TimeTableService
  ) { }

  ngOnInit() {
  this.getTimeTableForTeacher();
  }

  showPop() {
    const popcard = document.querySelector('.pop-card-holder');
    popcard.classList.toggle('show-pop');
  }


  showPop2() {
    const popcard = document.querySelector('.pop-card-holder2');
    popcard.classList.toggle('show-pop');
  }


  getTimeTableForTeacher() {
    this.timeTableService.getTimeTableForTeacher().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectAndTime = data.payload;
        console.log(this.subjectAndTime);
     }
  }, error => {
    console.log(error);
  });
}

}
