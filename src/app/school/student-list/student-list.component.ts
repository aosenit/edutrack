import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  fileString: any;


  constructor(
    private notifyService: NotificationsService,
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit() {
    this.studentBulkUploadForm = this.fb.group({
      Document: []
    });

    this.getAllStudents();
  }


  downloadStudentSampleFile() {
    this.studentService.downloadSampleBulkSheet().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        // console.log(data.payload);
        this.fileString = data.payload;
        this.convertBase64ToExcel();
      }
    });
  }


  convertBase64ToExcel() {

    const contentType = 'application/vnd.ms-excel';
    const blob1 = this.b64toBlob(this.fileString, contentType, 512);
    const blobUrl1 = URL.createObjectURL(blob1);

    window.open(blobUrl1);

  }

  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || 'application/vnd.ms-excel';
    sliceSize = sliceSize || 512;

    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  createStudentBulkUpload() {
    this.studentService.uploadBulkDocument(this.studentBulkUploadForm.value).subscribe((data: any) => {
      console.log('bulk file', data);
      if (data.hasError === false) {
        console.log('file successfully uplaoded', data.payload);
        this.notifyService.publishMessages(data.description, 'info', 1);
        document.getElementById('close').click();
        this.router.navigateByUrl('/admin/students');
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });


  }

  handleBulkUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
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
        // console.log('student list', this.studentList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  getPage(page: number) {
    // console.log(page);
    this.studentService.getAllStudents(page, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.studentList = data.payload;
        // this.studentList = data.payload.reverse();
        // console.log(this.studentList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);
    });
  }

  editStudent(id) {
    this.studentService.getStudentById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        sessionStorage.setItem('all-student-info', JSON.stringify(data.payload));
        this.router.navigateByUrl('/school/edit-student/' + id);
      }
    });
  }

  deleteStudent(id) {
    this.studentService.deleteStudentById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // console.log(data.payload);
        this.notifyService.publishMessages('Student deleted successfully', 'success', 1);
        this.getAllStudents();
      }
    });
  }

  clearData() {
    sessionStorage.removeItem('student-basic-details');
    sessionStorage.removeItem('student-social-details');
    sessionStorage.removeItem('Student-contact-details');
    sessionStorage.removeItem('student-medical-details');
  }
}
