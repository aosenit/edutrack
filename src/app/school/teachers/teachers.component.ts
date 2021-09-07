import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
teachersList: any;
searchString: string;
fileString: any;
  teacherBulkUpload: FormGroup;
  filename = null;
  constructor(
    private teacherService: TeacherService,
    private notifyService: NotificationsService,
    private router: Router,
    private fb: FormBuilder,


  ) { }

  ngOnInit() {
    this.teacherBulkUpload = this.fb.group({
      Document: []
    });
    this.getAllTeachers();
  }

  getAllTeachers() {
    this.teacherService.getAllTeachers().subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.teachersList = data.payload;
        // (this.teachersList);
      }
    });
  }

  editTeacher(id) {
    // this.notifyService.publishMessages('Service currently down', 'danger', 1);

    this.teacherService.getTeacherById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        sessionStorage.setItem('all-employee-info', JSON.stringify(data.payload));
        // (this.teachersList);
        this.router.navigateByUrl('/school/edit-employee/' + id);

      }
    });
  }

  deleteTeacher(id) {
    this.notifyService.publishMessages('Service currently down', 'danger', 1);

    // this.teacherService.getTeacherById(id).subscribe((data: any) => {
    //   if (data.hasErrors === false) {
    //     sessionStorage.setItem('all-teacher-info', JSON.stringify(data.payload));
    //     // (this.teachersList);
    //   }
    // });
  }

  downloadAdminSampleFile() {
    this.teacherService.downloadSampleBulkSheet().subscribe((data: any) => {
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

  handleBulkUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);
      this.filename = file.name;
      this.teacherBulkUpload.get('Document').setValue(file);
      // this.DocumentTypes.push(0);
    }
  }


  createTeacherBulkUpload() {
    this.teacherService.uploadBulkDocument(this.teacherBulkUpload.value).subscribe((data: any) => {
      console.log('bulk file', data);
      if (data.hasError === false) {
        console.log('file successfully uploaded', data.payload);
        this.notifyService.publishMessages(data.description, 'info', 1);
        document.getElementById('close').click();
        this.router.navigateByUrl('/admin/students');
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });


  }

}
