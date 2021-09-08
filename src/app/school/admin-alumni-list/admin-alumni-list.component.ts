import { Component, OnInit } from '@angular/core';
import { AlumniService } from 'src/services/data/alumni/alumni.service';

@Component({
  selector: 'app-admin-alumni-list',
  templateUrl: './admin-alumni-list.component.html',
  styleUrls: ['./admin-alumni-list.component.css']
})
export class AdminAlumniListComponent implements OnInit {
  searchString: string;

  constructor(
    private alumni: AlumniService
  ) { }

  ngOnInit() {
    this.getAllSchoolAlumnis();
  }

  editStudent() {

  }

  getAllSchoolAlumnis() {
    this.alumni.getAllAlumnis().subscribe((res: any) => {
      if (res.hasErrors === false ) {
        console.log(res);
      }
    }, error => {
      console.log(error);
    });
  }
}
