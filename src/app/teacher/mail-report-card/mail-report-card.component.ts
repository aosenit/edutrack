import { Component, OnInit } from '@angular/core';
import { ClassService } from 'src/services/data/class/class.service';

@Component({
  selector: 'app-mail-report-card',
  templateUrl: './mail-report-card.component.html',
  styleUrls: ['./mail-report-card.component.css']
})
export class MailReportCardComponent implements OnInit {
  boxChecked = false;
  classList: any;
  studentList: any;
  constructor(
    private classService: ClassService,

  ) { }

  ngOnInit() {
    this.getClassAndSubjectForTeacher();
  }

  getClassAndSubjectForTeacher() {
    this.classService.getClassAndSubjectForTeacherByTeacherId().subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        this.classList = data.payload;
      }
    }
    );
  }

  getSubjects(id) {
    
    this.classService.getStudentsInAClassByClassID(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        console.log(data.payload);
        this.studentList = data.payload;
        console.log(this.classList);
      }
    });

  }

  checked(event) {
    if (event === true) {
      document.getElementById('customCheck12').style.borderLeft = '5px solid #FB7B04';
      this.boxChecked = true;
    } else {
      document.getElementById('customCheck12').style.borderLeft = 'none';
      this.boxChecked = false;
   }
  }
}
