import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ClassArmService } from 'src/services/data/class-arm/class-arm.service';

@Component({
  selector: 'app-school-settings',
  templateUrl: './school-settings.component.html',
  styleUrls: ['./school-settings.component.css']
})
export class SchoolSettingsComponent implements OnInit {

  level = true;
  class = false;
  arm = false;
  subject = false;
  mail = false;
  id = 1;
  classArmform: FormGroup;
  constructor(
    private fb: FormBuilder,
    private classArmService: ClassArmService
    ) { }
  ngOnInit() {
    this.classArmform = this.fb.group({
      name: ['', Validators.required],
      status: ['']
    });

    this.getClassArms();
  }


  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus ) {

      case 'level':
          this.level = true;
          this.class = false;
          this.arm = false;
          this.subject = false;
          this.mail = false;
          break;


      case 'class':
          this.level = false;
          this.class = true;
          this.arm = false;
          this.subject = false;
          this.mail = false;
          break;

      case 'arm':
          this.level = false;
          this.class = false;
          this.arm = true;
          this.subject = false;
          this.mail = false;
          break;

      case 'subject':
          this.level = false;
          this.class = false;
          this.arm = false;
          this.subject = true;
          this.mail = false;
          break;

      case 'mail':
          this.level = false;
          this.class = false;
          this.arm = false;
          this.subject = false;
          this.mail = true;
          break;

      default:
        this.level = true;
    }
  }

  createClassArm() {
    console.log('class arm create', this.classArmform.value);
    this.classArmService.addClassArm( this.classArmform.value).subscribe(data => {
      console.log(data);
    });
  }

  getStatus(event) {
    console.log('status', event);
    if (event === true) {
      event.value = true;
    }

  }

  getClassArms() {
    this.classArmService.getAllClassArm().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        console.log( data.payload);
      }
    });
  }

}
