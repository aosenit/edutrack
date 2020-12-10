import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
@Component({
  selector: 'app-score-sheet',
  templateUrl: './score-sheet.component.html',
  styleUrls: ['./score-sheet.component.css']
})
export class ScoreSheetComponent implements OnInit {
  classList: any;
  subjectList: any;
  className: any;

  constructor(
    private subjectService: SubjectService,
    private classService: ClassService,
    private resultService: ResultService

  ) { }

  ngOnInit() {
    // $().dropdown('toggle');
    this.getAllClasses();
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.classList = data.payload;
        console.log(this.classList);
      }
    }
    );
  }

  getSubjects(id) {
    console.log(id);
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.subjectList = data.payload;
        console.log(this.subjectList.subject);
      }
    }
    );

    this.classService.getClassById(id).subscribe((data: any) => {
      this.className = data.payload;
      console.log('sdsdsdsd', this.className.name);
    });
   
    this.resultService.getStudentandAssement(1).subscribe((data: any) => {
    });

  }

  generate() {
     this.resultService.generateReport(this.className.id, this.className.name).subscribe((data: any) => {
       console.log(data);
     });
  }

}
