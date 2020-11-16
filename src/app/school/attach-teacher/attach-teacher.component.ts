import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/services/data/class/class.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';

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
id: any;
teacherDetails: any;
subjectList: any;
dropdownList = [];
dropdownSettings = {};



  constructor(
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private subjectService: SubjectService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getAllSections();
    this.getAllClassess();
    this.getTeacherByID();
    this.getAllSubjects();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'arm',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: false
    };
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

  getTeacherByID() {
    this.teacherService.getTeacherById(this.id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teacherDetails = data;
        console.log(this.teacherDetails);
      }
    });
  }

  getAllSubjects() {
    this.subjectService.getAllSubjects().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        this.subjectList = data.payload;
        const arr = [];
        this.subjectList.forEach(item => {
          arr.push({
            id: item.id,
            arm: item.name
          });
        });
        this.dropdownList = arr;
      }
    });
  }
}
