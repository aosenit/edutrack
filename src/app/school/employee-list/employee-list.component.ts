import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { StaffService } from 'src/services/data/staff/staff.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
record = false;
employeeList: any;
employeeDetail: any;
searchString: string;
fileString: any;
  staffUploadForm: FormGroup;
  filename = null;

  constructor(
              private staffService: StaffService,
              private notifyService: NotificationsService,
              private router: Router,
              private fb: FormBuilder,

              ) { }

  ngOnInit() {
    this.staffUploadForm = this.fb.group({
      Document: []
    });
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.staffService.getAllStaffInSchool().subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.employeeList = data.payload;
        // ('all employees', this.employeeList);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  // getEmployeeById(id) {
  //   this.staffService.getStaffById(id).subscribe( (data: any) => {
  //     if (data.hasErros === false) {
  //       // ('all schools', data);
  //       this.employeeDetail = data.payload;
  //     }
  //   }, error => {
  //     this.notifyService.publishMessages(error.errors, 'danger', 1);

  //   });
  // }

  addNewEmp() {

  }

  editEmployee(id) {
    // (id);
    this.staffService.getStaffById(id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        sessionStorage.setItem('all-employee-info', JSON.stringify(data.payload));
        this.router.navigateByUrl('/school/edit-employee/' + id);
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }


  deleteEmployee(id) {
    // (id);
    this.staffService.deleteStaffById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
      this.notifyService.publishMessages('Staff deleted', 'success', 1);

      }
    }, error => {
            this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  downloadAdminSampleFile() {
    this.staffService.downloadSampleBulkSheet().subscribe((data: any) => {
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
      this.staffUploadForm.get('Document').setValue(file);
      // this.DocumentTypes.push(0);
    }
  }

  createStafftBulkUpload() {
    this.staffService.uploadBulkDocument(this.staffUploadForm.value).subscribe((data: any) => {
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


  clearData() {
    sessionStorage.removeItem('employee-personal-data');
    sessionStorage.removeItem('Employee-Data');
    sessionStorage.removeItem('employee-contact-details');
    sessionStorage.removeItem('employee-education');
    sessionStorage.removeItem('employee-next-kin');
    sessionStorage.removeItem('employee-experience');
    sessionStorage.removeItem('all-employee-info');
  }

}
