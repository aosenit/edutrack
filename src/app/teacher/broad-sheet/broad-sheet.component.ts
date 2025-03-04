import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SubjectService } from 'src/services/data/subject/subject.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';

@Component({
  selector: 'app-broad-sheet',
  templateUrl: './broad-sheet.component.html',
  styleUrls: ['./broad-sheet.component.css']
})
export class BroadSheetComponent implements OnInit {
  noData = true;
  displayData = false;
  classList: any;
  Classid: any;
  studentData: any;
  subjectList: any;
  subject: any;
  levels: any;

  constructor(
    private subjectService: SubjectService,
    private classService: ClassService,
    private resultService: ResultService,
    private notifyService: NotificationsService,
    private schoolSectionService: SchoolSectionService
  ) { }

  ngOnInit() {
    // this.getAllClasses();
    this.getSections();
  }

  getSections() {
    this.schoolSectionService.getSection().subscribe(
      (res: any) => {
        // tslint:disable-next-line:no-string-literal
        this.levels = res['payload'];
        // this.levels = this.levels.reverse();
        // ('levels', this.levels);
      }
    );
  }

  getClassBySectionId(id) {
    // (id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classList = data.payload;

        }
      });

  }


  getSubjectsAndStudents(id) {
    // ('class id ', id);
    this.Classid = id;
    sessionStorage.setItem('class-id', this.Classid);

    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.noData = false;
        this.displayData = true;
        this.getBroadSheet();
      }
    });
  }

  getBroadSheet() {
    // this.resultService.get(this.Classid).subscribe((data: any) => {
    this.resultService.getStudentBroadSheetApprovedByTEacher(this.Classid).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.studentData = data.payload;
        this.subject = this.studentData[0].assessmentAndScores;
        // // ();
      } else {

        this.notifyService.publishMessages(data.errors, 'danger', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  saveStudentDetails(u) {
    // (this.studentData[u]);
    sessionStorage.setItem('student-details', JSON.stringify(this.studentData[u]) );
  }

  downloadBroadsheetInExcel(){
    
    sessionStorage.getItem(this.Classid);

    this.resultService.exportBroadsheetExcel(this.Classid).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} as at ${new Date().toLocaleString()}.xlsx`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
  downloadBroadsheetInPdf(){

    sessionStorage.getItem(this.Classid);

    this.resultService.exportBroadsheetPdf(this.Classid).subscribe((res: any) => {
      if (res.hasErrors === false) {
        const link = document.createElement('a');
        link.download = `${res.payload.fileName} as at ${new Date().toLocaleString()}.pdf`;
        link.href = 'data:image/png;base64,' + res.payload.base64String;
        link.click();
      }
    });
  }
}
