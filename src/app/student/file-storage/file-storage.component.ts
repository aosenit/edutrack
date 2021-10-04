import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from 'src/services/data/assignment/assignment.service';
import { ClassWorkService } from 'src/services/data/class-work/class-work.service';
import { FilesService } from 'src/services/data/files/files.service';
import { LessonNoteService } from 'src/services/data/lesson-note/lesson-note.service';

@Component({
  selector: 'app-file-storage',
  templateUrl: './file-storage.component.html',
  styleUrls: ['./file-storage.component.css']
})
export class FileStorageComponent implements OnInit {
id: any;
allLessonNote: any;
assignmentlist: any;
classWorks: any;
  assignmentDetails: any;
  lessonNoteDetails: any;
  classWorkDetails: any;
  constructor(
    private route: ActivatedRoute,
    private lessonNoteService: LessonNoteService,
    private classWorkService: ClassWorkService,
    private assignmentServie: AssignmentService,
    private fileService: FilesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.getLessNotes();
    this.getClassWork();
    this.getAssignments();
  }

  getLessNotes() {
    this.lessonNoteService.getlessonNoteFile(this.id).subscribe((data: any) => {
          // // ('lesson notes', data);
        if (data.hasErrors === false) {
          this.allLessonNote = data.payload;
        }
    });
  }

  getClassWork() {
    this.classWorkService.getClassWorkFiles(this.id).subscribe((data: any) => {
        // // ('class work notes', data);
      if (data.hasErrors === false) {
        this.classWorks = data.payload;
      }
  });
  }
  getAssignments() {
    this.assignmentServie.getAssignmentFiles(this.id).subscribe((data: any) => {
        // // ('assignments', data);
      if (data.hasErrors === false) {
        this.assignmentlist = data.payload;
      }
  });
  }

  downloadClassWork(fileId) {
    // (fileId);
    this.fileService.getFileUpload(fileId).subscribe((data: any) => {
      // (data);
      console.log(data);
    });
  }

  openLessonPreview(id, i) {
    this.lessonNoteDetails = this.allLessonNote[i];
    sessionStorage.setItem('student-assignment', JSON.stringify(this.lessonNoteDetails));
    this.router.navigateByUrl('/student/preview/' + id );
  }
  openAssignmentPreview(id, i) {
    this.assignmentDetails = this.assignmentlist[i];
    sessionStorage.setItem('student-assignment', JSON.stringify(this.assignmentDetails));
    this.router.navigateByUrl('/student/preview/' + id );
  }
  openClassWorkPreview(id, i) {
    this.classWorkDetails = this.classWorks[i];
    sessionStorage.setItem('student-assignment', JSON.stringify(this.classWorkDetails));
    this.router.navigateByUrl('/student/preview/' + id );
  }

}
