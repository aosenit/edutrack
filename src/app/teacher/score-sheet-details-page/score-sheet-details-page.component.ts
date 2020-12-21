import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultService } from 'src/services/data/result/result.service';

@Component({
  selector: 'app-score-sheet-details-page',
  templateUrl: './score-sheet-details-page.component.html',
  styleUrls: ['./score-sheet-details-page.component.css']
})
export class ScoreSheetDetailsPageComponent implements OnInit {
studId: any;
studentRecord: any;
assessments: any;
studentNameAndReg: any;
  constructor(

    private route: ActivatedRoute,
    private resultService: ResultService,

  ) { }

  ngOnInit() {
    this.studId = this.route.snapshot.params.id;
    this.studentNameAndReg = JSON.parse(sessionStorage.getItem('student-details'));
    console.log(this.studentNameAndReg);
    this.getStudentScoreSheet();
  }

  getStudentScoreSheet() {
    const classId = sessionStorage.getItem('class-id');
    this.resultService.getStudentBroadSheet(this.studId, classId).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data);
        this.studentRecord = data.payload.breakdowns;
        this.assessments = data.payload.breakdowns[0].assesmentAndScores;
        console.log(this.assessments);
      }
    }, error => {
      console.log(error);
    });
  }

  back() {
    window.history.back();
  }
}
