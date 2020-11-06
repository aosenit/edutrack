import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
@Output() sendChildName = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    this.sendChildName.emit('Work experience');
  }


}
