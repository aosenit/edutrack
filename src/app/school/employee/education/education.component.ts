import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  countries: any = countries;
@Output() sendChildName = new EventEmitter<string>();
  constructor(private home: EmployeeComponent) { }

  ngOnInit() {
    this.sendChildName.emit('Education');
  }

  nextStep() {
    this.home.stepper(6);
  }


}
