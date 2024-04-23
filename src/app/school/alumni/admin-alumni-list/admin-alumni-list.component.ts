import { Component, OnInit } from '@angular/core';
import { AlumniService } from 'src/services/data/alumni/alumni.service';
import { AssessmentService } from 'src/services/data/assessment/assessment.service';

@Component({
  selector: 'app-admin-alumni-list',
  templateUrl: './admin-alumni-list.component.html',
  styleUrls: ['./admin-alumni-list.component.css']
})
export class AdminAlumniListComponent implements OnInit {
  searchString: string;
  alumniList: any;
  currentSesion: any;
  sessionName: any;
  termName: any;

  constructor(
    private alumni: AlumniService,
    private assessment: AssessmentService
  ) { }

  ngOnInit() {
    this.getCurrentSession();
  }

  getCurrentSession() {
    this.assessment.getCurrentSession().subscribe((res: any) => {
      if (res.hasErrors === false) {
        this.currentSesion = res.payload;
        this.sessionName = res.payload.name;
        // tslint:disable-next-line:prefer-for-of
        for (let index = 0; index < this.currentSesion.terms.length; index++) {

          this.termName = this.currentSesion.terms[2].name;

        }
        this.getAllSchoolAlumnis(this.sessionName, this.termName);

      }
    });
  }

  editStudent() {

  }

  getAllSchoolAlumnis(session, term) {
    this.alumni.getAllAlumnis(session, term).subscribe((res: any) => {
      if (res.hasErrors === false ) {
        this.alumniList = res.payload;
        console.log(res.payload);
      }
    }, error => {
      console.log(error);
    });
  }
}
