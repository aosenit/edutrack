import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-result-settings',
  templateUrl: './result-settings.component.html',
  styleUrls: ['./result-settings.component.css']
})
export class ResultSettingsComponent implements OnInit {
grade = true;
type = false;
domain = false;
  constructor() { }

  ngOnInit() {
  }

  showStatus(status: string) {
    const newStatus = status;
    switch (newStatus) {
        case 'grade':
          this.grade = true;
          this.type = false;
          this.domain = false;
          break;

        case 'type':
          this.grade = false;
          this.type = true;
          this.domain = false;
          break;

        case 'domain':
          this.grade = false;
          this.type = false;
          this.domain = true;
          break;

        default:
          this.grade = true;
    }
  }

}
