import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilesService } from 'src/services/data/files/files.service';
import { SchoolService } from 'src/services/data/school/school.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {
id: any;
schoolDetail: any;
logoId: any;
iconId: any;
imageSrc: any;
iconSrc: any;
  constructor(
    private route: ActivatedRoute,
    private schoolServices: SchoolService,
    private fileService: FilesService, ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // console.log(this.id);
    this.getSchoolDetialsByID();
  }

  getSchoolDetialsByID() {
    this.schoolServices.getSchoolById(this.id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.schoolDetail = data.payload;
        // console.log(this.schoolDetail);
      }
    });
  }


  back() {
    window.history.back();
  }

}
