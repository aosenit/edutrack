import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personal-settings',
  templateUrl: './personal-settings.component.html',
  styleUrls: ['./personal-settings.component.css']
})
export class PersonalSettingsComponent implements OnInit {

  dept = true;
  job = false;
  employment = false;
  qualification = false;
  occupation = false;
  constructor() { }

  ngOnInit() {
  }

  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus ) {

      case 'dept':
          this.dept = true;
          this.job = false;
          this.employment = false;
          this.qualification = false;
          this.occupation = false;
          break;


      case 'job':
          this.dept = false;
          this.job = true;
          this.employment = false;
          this.qualification = false;
          this.occupation = false;
          break;

      case 'employment':
          this.dept = false;
          this.job = false;
          this.employment = true;
          this.qualification = false;
          this.occupation = false;
          break;

      case 'qualification':
          this.dept = false;
          this.job = false;
          this.employment = false;
          this.qualification = true;
          this.occupation = false;
          break;

      case 'occupation':
          this.dept = false;
          this.job = false;
          this.employment = false;
          this.qualification = false;
          this.occupation = true;
          break;

      default:
        this.dept = true;
    }
  }
}
