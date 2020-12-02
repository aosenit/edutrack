import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { StudentService } from 'src/services/data/student/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentBulkUploadForm: FormGroup;
  record = false;
  filename = null;
  studentList: any;
  searchString: string;
  p = 1;
  itemsPerPage = 5;
  studentCount: number;


  constructor(
    private notifyService: NotificationsService,
    private fb: FormBuilder,
    private studentService: StudentService
  ) { }

  ngOnInit() {
    this.studentBulkUploadForm = this.fb.group({
      Document: []
    });

    this.getAllStudents();
  }

  createStudentBulkUpload() {
    // this.studentService.uploadBulkDocument(this.studentBulkUploadForm.value).subscribe((data: any) => {
    //   console.log('bulk file', data);
    //   if (data.hasError === false) {
    //     console.log('file successfully uplaoded', data.payload);
    //     this.notifyService.publishMessages(data.description, 'info', 1);
    //     document.getElementById('close').click();
    //     this.router.navigateByUrl('/admin/students');
    //   }
    // }, error => {
    //   this.notifyService.publishMessages(error.errors, 'danger', 1);

    // });


  }

  handleBulkUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      this.filename = file.name;
      this.studentBulkUploadForm.get('Document').setValue(file);
      // this.DocumentTypes.push(0);
    }
  }

  getAllStudents() {
    this.studentService.getAllStudents(this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentList = data.payload;
        this.studentCount = data.totalCount;
        console.log(this.studentList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }
  getPage(page: number) {
    console.log(page);
    this.studentService.getAllStudents(page, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentList = data.payload.reverse();
        console.log(this.studentList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }
}
