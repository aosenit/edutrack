import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';
import { ClassService } from 'src/services/data/class/class.service';
import { ResultService } from 'src/services/data/result/result.service';
import { SchoolSectionService } from 'src/services/data/school-section/school-section.service';

@Component({
  selector: 'app-school-grade-book',
  templateUrl: './school-grade-book.component.html',
  styleUrls: ['./school-grade-book.component.css']
})
export class SchoolGradeBookComponent implements OnInit {
  noData = true;
  displayData = false;
  sessionList: any;
  terms: any;
  levels: any;
  classList: any;
  Classid: any;
  studentData: any;
  subjectList: any;
  subject: any;
  cummlativeScore: any;



  constructor(
    private assessmentService: AssessmentService,
    private schoolSectionService: SchoolSectionService,
    private classService: ClassService,
    private resultService: ResultService,
    private notifyService: NotificationsService,





  ) { }

  ngOnInit() {
    this.getSession();
    this.getSections();
  }

  getSession() {
    this.assessmentService.getCurrentSession().subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.sessionList = data.payload;
        this.terms = this.sessionList[0].terms;
        console.log(this.terms);
      }
    });
  }

  getSections() {
    this.schoolSectionService.getSection().subscribe(
      (res: any) => {
        // tslint:disable-next-line:no-string-literal
        this.levels = res['payload'];
        // this.levels = this.levels.reverse();
        console.log('levels', this.levels);
      }
    );
  }

  getClassBySectionId(id) {
    console.log(id);
    this.classService.getClassBySection(id).subscribe((data: any) => {
        if (data.hasErrors === false) {
          this.classList = data.payload;

        }
      });

  }

  getSubjectsAndStudents(id) {
    console.log('class id ', id);
    this.Classid = id;
    this.classService.getAllSubjectsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.noData = false;
        this.displayData = true;
        this.getBroadSheet();
      }
    });
  }

  getBroadSheet() {
    this.resultService.getClassBroadSheet(this.Classid).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.studentData = data.payload;
        this.subject = this.studentData[0].assessmentAndScores;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.studentData.length; i++) {
          const arr = [];
          this.studentData[i].assessmentAndScores.forEach(element => {
            arr.push(element.score);
            this.cummlativeScore = arr.reduce((a, b) => a + b, 0);
            this.studentData[i].cummulative = this.cummlativeScore;
          });
        }
        // console.log();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

}
