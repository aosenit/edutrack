import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { FilesService } from 'src/services/data/files/files.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
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
filename = null;
profileInfo: any;
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
      avatar: []
    });
    this.getAllSchools();
  }

  getAllSchools() {
    this.schoolServices.getAllSchools().subscribe( (data: any) => {
      if (data) {
        console.log('all schools', data);
        this.clientList = data.payload;
        this.clientCount = data.totalCount;
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });
  }

  getImageID(id) {
    // console.log('logo id', id);
    this.logoId = id;
    this.fileService.getFileUpload(this.logoId).subscribe( (data: any) => {
      if (data) {
        this.imagesrc = data.payload;
        console.log('school logo gotten here', this.imagesrc);
      }
    });
  }

 handleBulkUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.filename = file.name;
      this.bulkUpload.get('avatar').setValue(file);
      // this.DocumentTypes.push(0);
    }
  }

  UploadBulkFile() {
    this.schoolServices.uploadBulkDocument(this.bulkUpload.value).subscribe((data: any) => {
      // console.log('bulk file', data);
      if (data.hasError === false) {
        console.log('file successfully uplaoded', data.paylaod);
        this.notifyService.publishMessages(data.description, 'info', 1);
        document.getElementById('close').click();
        this.router.navigateByUrl('/admin/clients');
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });


  }

  deleteClient(id) {
    this.schoolServices.deleteSchoolById(id).subscribe((data: any) => {
      console.log(data);
      if (data.hasError === false) {
        this.getAllSchools();
        this.notifyService.publishMessages(data.description, 'success', 1);
      }
    }, error => {
      this.notifyService.publishMessages(error.error, 'danger', 1);
    });
  }

  editClient(id) {
    this.schoolServices.getSchoolById(id).subscribe( (data: any) => {
      if (data.hasErrors === false) {
        this.profileInfo = data.payload;
        console.log('assa', this.profileInfo);
        sessionStorage.setItem('client-info', JSON.stringify(this.profileInfo));
        this.router.navigateByUrl('/admin/edit-client/' + id);
      }
    });
  }


}
