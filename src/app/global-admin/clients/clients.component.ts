import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FilesService } from 'src/services/data/files/files.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  emptyRecord: false;
  emptyList: any;
  clientList: any;
  clientCount: any;
  logoId: any;
  imagesrc: any;
  tableImg: any;
  bulkUpload: FormGroup;
  schoolSelection: FormGroup;
  filename = null;
  profileInfo: any;
  searchString: string;
  p = 1;
  itemsPerPage = 10;
  // DocumentTypes: number[] = [];

  constructor(
    private schoolServices: SchoolService,
    private fileService: FilesService,
    private notifyService: NotificationsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.bulkUpload = this.fb.group({
      bulkFile: []
    });
    this.getAllSchools();
    this.schoolSelection = this.fb.group({
      school: ['', Validators.required]
    });
  }

  getAllSchools() {
    this.schoolServices.getAllSchools(this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data) {
        this.clientList = data.payload;
        this.clientCount = data.totalCount;
        // this.clientList.reverse();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getPage(page: number) {
    this.schoolServices.getAllSchools(page, this.itemsPerPage).subscribe((data: any) => {
      if (data) {
        // // ('all schools', data);
        this.clientList = data.payload;
        this.clientCount = data.totalCount;
        // this.clientList.reverse();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getImageID(id) {
    // // ('logo id', id);
    this.logoId = id;
    this.fileService.getFileUpload(this.logoId).subscribe((data: any) => {
      if (data) {
        this.imagesrc = data.payload;
        // // ('school logo gotten here', this.imagesrc);
      }
    });
  }

  handleBulkUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // // (file);
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ) {
        this.notifyService.publishMessages('Invalid format! Please select only excel file', 'danger', 1);
        return;
      } else {
        this.filename = file.name;
        this.bulkUpload.get('bulkFile').setValue(file);
      }
      // this.DocumentTypes.push(0);
    }
  }

  UploadBulkFile() {
    this.schoolServices.uploadBulkDocument(this.bulkUpload.value).subscribe((data: any) => {
      // // ('bulk file', data);
      if (data.hasErrors === false) {
        // // ('file successfully uplaoded', data.payload);
        this.notifyService.publishMessages(data.description, 'success', 1);
        document.getElementById('closeModal').click();
        this.getAllSchools();
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });


  }

  deleteClient(id) {
    this.schoolServices.deleteSchoolById(id).subscribe((data: any) => {
      // // (data);
      if (data.hasErrors === false) {
        this.getAllSchools();
        this.notifyService.publishMessages(data.description, 'success', 1);
        this.getAllSchools();

        // location.reload();
      }
    }, error => {
      this.notifyService.publishMessages(error.error, 'danger', 1);
    });
  }

  editClient(id) {
    this.schoolServices.getSchoolById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        this.profileInfo = data.payload;
        // // ('assa', this.profileInfo);
        sessionStorage.setItem('client-info', JSON.stringify(this.profileInfo));
        this.router.navigateByUrl('/admin/edit-client/' + id);
        this.getAllSchools();

      }
    });
  }


  selectSchool() {
    console.log(this.schoolSelection.value);
    const {school} = this.schoolSelection.value;
    if ( school === 1) {
      document.getElementById('close').click();
      this.router.navigateByUrl('/admin/create-client');
    } else {
      document.getElementById('close').click();
      this.router.navigateByUrl('/admin/group-of-schools');
    }
  }

  clearData() {
    sessionStorage.removeItem('profile-info');
    sessionStorage.removeItem('school-details');
    sessionStorage.removeItem('contact-person');
  }


}
