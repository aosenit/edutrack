import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { ParentsService } from 'src/services/data/parents/parents.service';

@Component({
  selector: 'app-parent-list',
  templateUrl: './parent-list.component.html',
  styleUrls: ['./parent-list.component.css']
})
export class ParentListComponent implements OnInit {
  record = false;
  parentList: any;
  searchString: string;
  p = 1;
  itemsPerPage = 10;
  parentCount: number;
  adminDetails: any;
  searchField!: FormControl;
  studentBulkUploadForm: FormGroup;
  filename = null;
  fileString: any;


  constructor(
    private parentService: ParentsService,
    private notifyService: NotificationsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.studentBulkUploadForm = this.fb.group({
      Document: []
    });

    const helper = new JwtHelperService();
    this.adminDetails = helper.decodeToken(localStorage.getItem('access_token'));
    this.getAllParents();
    this.searchField = new FormControl();
    this.searchField.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged()
    )
    .subscribe(term => {
      this.searchParent(term);
    });
  }

  getAllParents() {
    this.parentService.getAllParentsInASchool(this.adminDetails.TenantId, this.p, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.parentList = data.payload;
        this.parentCount = data.totalCount;
      } else {
        this.notifyService.publishMessages(data.errors, 'danger', 1);

      }
    },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
      });
  }

  getPage(page: number) {
    // (page);
    this.parentService.getAllParentsInASchool(this.adminDetails.TenantId, page, this.itemsPerPage).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data);
        this.parentList = data.payload;
        this.parentCount = data.totalCount;
      }
    },
      error => {
        this.notifyService.publishMessages(error.message, 'danger', 1);
      });

  }

  editParent(id) {
    // (id);
    this.parentService.getParentById(id).subscribe((data: any) => {
      if (data.hasErrors === false) {
        // (data.payload);
        sessionStorage.setItem('all-parent-info', JSON.stringify(data.payload));
        this.router.navigateByUrl('/school/edit-parent/' + id);
      }
    });
  }

  deleteParent(id) {
    this.notifyService.publishMessages('Service currently down', 'danger', 1);
    // this.parentService.deleteParentById(id).subscribe((data: any) => {
    //   if (data.hasErrors === false) {
    //     // (data.payload);
    //     this.notifyService.publishMessages('Parent deleted successfully', 'success', 1);

    //   }
    // }, error => {
    //   this.notifyService.publishMessages(error.message, 'danger', 1);

    // });
  }

  searchParent(event: string) {
    if (event === '' ) {
      this.getAllParents();
    } else {
      this.parentService.searchSingleParent(event, this.adminDetails.TenantId).subscribe((res: any) => {
        this.parentList = res.payload;
      });
    }
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
    this.parentService.uploadBulkDocument(this.studentBulkUploadForm.value).subscribe((data: any) => {
      console.log('bulk file', data);
      if (data.hasErrors === false) {
        console.log('file successfully uplaoded', data.payload);
        this.notifyService.publishMessages(data.description, 'success', 1);
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

  downloadStudentSampleFile() {
    this.parentService.downloadSampleBulkSheet().subscribe((data: any) => {
      if (data.hasErrors === false ) {
        // console.log(data.payload);
        this.fileString = data.payload;
        this.convertBase64ToExcel();
      }
    });
  }


  clearStorage() {
    sessionStorage.removeItem('parent-basic-details');
    sessionStorage.removeItem('parent-social-details');

  }
}
