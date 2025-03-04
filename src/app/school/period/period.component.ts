import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { TimeTableService } from 'src/services/data/time-table/time-table.service';
@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {
  addPeriodForm: FormGroup;
  periods = [];
  periodStep = 0;
  periodName: any;
  load = false;
  constructor(
    private fb: FormBuilder,
    private timetableService: TimeTableService,
    private notifyService: NotificationsService
  ) { }

  ngOnInit() {
    this.addPeriodForm = this.fb.group({
      name: ['', Validators.required],
      timeFrom: ['', Validators.required],
      timeTo: ['', Validators.required],
      isBreak: false
    });
    this.getAllPeriods();
    


  }


  getAllPeriods() {
    this.timetableService.getPeriods().subscribe((data: any) => {
      if (data.hasErrors === false) {
        sessionStorage.setItem('periods', JSON.stringify(data.payload));
        const periods = JSON.parse(sessionStorage.getItem('periods'));
        this.periodName = periods;
        // ('periods', this.periodName);

        this.notify();
        // // (this.periods);
      }
    });
  }


  addPeriod() {
    sessionStorage.removeItem('periods');
  }

  allowBreak(event) {

  }

  createPeriod() {
    const step = this.periodStep++;
    const {name, timeFrom, timeTo, isBreak} = this.addPeriodForm.value;
    const results = {
    step,
    name,
    timeFrom,
    timeTo,
    isBreak

    };
    document.getElementById('myModal').click();
    this.periods.push(results);
    this.periodName = this.periods;
    // // ('periods', this.periodName);
    this.addPeriodForm.reset();
    this.addPeriodForm.controls.isBreak.setValue(false);
  }

  publishPeriods() {
    this.timetableService.createPeriod(this.periods).subscribe((data: any) => {
      // // (data);
      if ( data.hasErrors === false) {
        sessionStorage.setItem('periods', JSON.stringify(data.payload));
        this.notifyService.publishMessages('All period successfully published ', 'info', 1);
      } else {

        this.notifyService.publishMessages( data.errors, 'danger', 1);
      }
    }, error => {
      this.notifyService.publishMessages( error.errors, 'danger', 1);

    });

  }

  notify() {
    setTimeout(() => {
      document.getElementById('popupBtn').click();
    }, 2000);
  }
}
