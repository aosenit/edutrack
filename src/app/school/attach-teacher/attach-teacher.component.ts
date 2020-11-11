import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';

@Component({
  selector: 'app-attach-teacher',
  templateUrl: './attach-teacher.component.html',
  styleUrls: ['./attach-teacher.component.css']
})
export class AttachTeacherComponent implements OnInit {
teacher = false;
emptyRecord = false;
sections: any;
classes: any;
  constructor(
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.getAllSections();
    this.getAllClassess();
  }

  back() {
    window.history.back();
  }

  getStaffStatus(event: string) {
    if (event === 'yes') {
        this.teacher = true;
    } else {
      if (event === 'no') {
        this.teacher = false;
      }
    }
  }

  getAllSections() {
    this.schoolSectionService.getSection().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.sections = data.payload;
      }
    });
  }

  getAllClassess() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classes = data.payload;
      }
    });
  }
}
