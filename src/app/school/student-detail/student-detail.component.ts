import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/services/data/student/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
id: any;
studentDetails: any;
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // console.log(this.id);
    this.getStudentByID();
  }

  back() {
    window.history.back();
  }

  getStudentByID() {
    this.studentService.getStudentById(this.id).subscribe((data: any) => {
      // console.log('ssasasa', data);
      if (data.hasErrors === false ) {
        this.studentDetails = data.payload;
      }
    }, error => {
      // console.log(error);
    });
  }

}
