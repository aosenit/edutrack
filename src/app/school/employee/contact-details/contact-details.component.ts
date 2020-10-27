import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';
import { countries } from '../../../../services/utils/country.json';


@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  countries: any = countries;
  states: any[];
  @Output() sendChildName = new EventEmitter<string>();

  constructor(private home: EmployeeComponent) { }

  ngOnInit() {
    this.sendChildName.emit('Contact Details');
  }

  nextStep() {
    this.home.stepper(4);
  }

  getState(event) {
    for (const unit in countries) {
        if (event === countries[unit].country) {
          const state = countries[unit].states;
          this.states = state;
        }
      }

    }

}
