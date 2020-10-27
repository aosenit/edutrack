import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  @Output() sendChildName = new EventEmitter<string>();
  constructor(private home: EmployeeComponent) { }

  ngOnInit() {
    this.sendChildName.emit('Personal Information');
  }



  nextStep() {
    this.home.stepper(2);
  }




}
