import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';

@Component({
  selector: 'app-time-table',
  templateUrl: './time-table.component.html',
  styleUrls: ['./time-table.component.css']
})
export class TimeTableComponent implements OnInit {
sections: any;
classes: any;
  constructor(
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.getSchoolSection();
    this.getClasses();
  }

  getSchoolSection() {
    this.schoolSectionService.getSection().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }

  getClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classes = data.payload;
      }
    });
  }
}
