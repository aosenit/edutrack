import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.css']
})
export class FileManagerComponent implements OnInit {
  subjectList: object;
  constructor(
    private classService: ClassService
  ) { }

  ngOnInit() {
    this.getAllSubjects();

  }



  getAllSubjects() {
    // const classId = 25;
    this.classService.getAllSubjectsInAClassWithClassNotePreview().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        console.log(data);
        this.subjectList = data.payload;
      }
    });
  }
}
