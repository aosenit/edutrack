import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  logoname = null;
  iconname = null;
  mediaForm: FormGroup;
  DocumentTypes: number[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notifyService: NotificationsService,
    private schoolServies: SchoolService) { }

  ngOnInit() {
    // const DocumentTypes = [0, 1];
    this.mediaForm = this.fb.group({
      logo: [null],
      icon: [null]
    });
  }

  createSchool() {
    const profile = JSON.parse(sessionStorage.getItem('profile-info'));
    const details = JSON.parse(sessionStorage.getItem('school-details'));
    const contactperson =  JSON.parse(sessionStorage.getItem('contact-person'));
    const finalstep = this.mediaForm.value;

    // const formData = new FormData();
    // this.DocumentTypes.forEach((item: any) => formData.append('DocumentTypes', item));


    const result = {...profile, ...details, ...contactperson, ...finalstep, DocumentTypes: this.DocumentTypes};

    this.schoolServies.addSchool(result).subscribe( (data: any) => {
      if ( data ) {
          console.log('school create successfully', data);
          this.notifyService.publishMessages(data.description, 'info', 1);
          sessionStorage.clear();
          this.router.navigateByUrl('/admin/clients');
      }
    }, error => {
      this.notifyService.publishMessages(error.errors, 'danger', 1);

    });

  }

  handleImgUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log('file', file);
      this.logoname = file.name;
      this.mediaForm.get('logo').setValue(file);
      this.DocumentTypes.push(0);
      // this.iconname = this.icon.name;
    }
  }

  handleIconUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log('file', file);
      this.iconname = file.name;
      this.mediaForm.get('icon').setValue(file);
      this.DocumentTypes.push(1);

      // this.iconname = this.icon.name;
    }
  }

}
