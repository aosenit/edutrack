import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { StaffService } from 'src/services/data/staff/staff.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  @Output() sendChildName = new EventEmitter<string>();

  profilephotoname = null;
  signaturename = null;
  mediaForm: FormGroup;
  DocumentTypes: number[] = [];

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private teacherService: TeacherService,
    private notifyService: NotificationsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.sendChildName.emit('Images');

    this.mediaForm = this.fb.group({
      profile: [null],
      signature: [null]
    });
  }

  createEmployee() {
    const profile = JSON.parse(sessionStorage.getItem('Personal-Data'));
    const details = JSON.parse(sessionStorage.getItem('Employee-Data'));
    const contactperson = JSON.parse(sessionStorage.getItem('employee-contact-details'));
    const education = JSON.parse(sessionStorage.getItem('employee-education'));
    const nextKin = JSON.parse(sessionStorage.getItem('employee-next-kin'));
    const experience = JSON.parse(sessionStorage.getItem('employee-experience'));
    const finalstep = this.mediaForm.value;

    const result = {
      ...profile,
      ...details,
      ...contactperson,
      ...education,
      ...nextKin,
      ...experience,
      ...finalstep,
      DocumentTypes: this.DocumentTypes
    };

    if (result.staffType === 'academic') {
      console.log('all employee data', result);
      this.teacherService.addTeacher(result).subscribe((data: any) => {
        console.log('employee added', data);
        if (data.code == 1) {
          this.notifyService.publishMessages(data.description, 'info', 1);
          sessionStorage.clear();
          this.router.navigateByUrl('/school/employees');
        } else {
          this.notifyService.publishMessages(data.description, 'danger', 1);
        }
      }, error => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);

      });

    } else {
      console.log('all employee data', result);
      this.staffService.addStaff(result).subscribe((data: any) => {
        console.log('employee added', data);
        if (data.code == 1) {
          this.notifyService.publishMessages(data.description, 'info', 1);
          sessionStorage.clear();
          this.router.navigateByUrl('/school/employees');
        }else {
          this.notifyService.publishMessages(data.description, 'danger', 1);
        }
      }, error => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);

      });
    }

  }



  handlePhotoUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.profilephotoname = file.name;
      this.mediaForm.get('profile').setValue(file);
      this.DocumentTypes.push(2);
      // this.iconname = this.icon.name;
    }
  }

  handleSignatureUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.signaturename = file.name;
      this.mediaForm.get('signature').setValue(file);
      this.DocumentTypes.push(8);

      // this.iconname = this.icon.name;
    }
  }
}
