import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeComponent } from '../employee.component';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  @Output() sendChildName = new EventEmitter<string>();
  iconname = null;

  constructor(private home: EmployeeComponent) { }

  ngOnInit() {
    this.sendChildName.emit('Personal Information');
  }



  nextStep() {
    this.home.stepper(2);
  }

  // handleIconUpload(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log('file', file);
  //     this.iconname = file.name;
  //     // this.profileForm.get('icon').setValue(file);
  //     // this.iconname = this.icon.name;
  //   }
  // }



}
