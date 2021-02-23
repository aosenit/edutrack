import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { StaffService } from 'src/services/data/staff/staff.service';
import { TeacherService } from 'src/services/data/teacher/teacher.service';
import { EmployeeComponent } from '../employee.component';


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  @Output() sendChildName = new EventEmitter<string>();

  profilephotoname = null;
  signaturename = null;
  signature = [];
  photo = [];
  mediaForm: FormGroup;
  DocumentTypes: number[] = [];
  formBtn = {
    type: 'create',
    text: 'Create'
  };
  id: any;


  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private teacherService: TeacherService,
    private notifyService: NotificationsService,
    private router: Router,
    private home: EmployeeComponent,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    this.sendChildName.emit('Images');

    this.mediaForm = this.fb.group({
      profile: [null],
      signature: [null]
    });
    this.id = this.route.snapshot.params.id;
    console.log('page id', this.id);
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.createMediaForm();
      } else {
        this.updateMediaForm();
      }
    });
  }

  createMediaForm() {
    this.mediaForm = this.fb.group({
      profile: [null],
      signature: [null]
    });
  }
  updateMediaForm() {
    this.mediaForm = this.fb.group({
      profile: [null],
      signature: [null]
    });

    this.formBtn = {
      type: 'Update',
      text: 'Update'
    };
  }

  createEmployee() {
    const profile = JSON.parse(sessionStorage.getItem('employee-personal-data'));
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
    // const {StaffType} = details;
    // creating employer and teacher
    if (result.StaffType === '1') {
      if (this.formBtn.type === 'create') {
        console.log('all employee data', result);
        this.teacherService.addTeacher(result).subscribe((data: any) => {
          console.log('employee added', data);
          if (data.hasErrors === false) {
            this.notifyService.publishMessages(data.description, 'info', 1);
            sessionStorage.removeItem('employee-personal-data');
            sessionStorage.removeItem('Employee-Data');
            sessionStorage.removeItem('employee-contact-details');
            sessionStorage.removeItem('employee-education');
            sessionStorage.removeItem('employee-next-kin');
            sessionStorage.removeItem('employee-experience');
            this.router.navigateByUrl('/school/employees');
          }
        }, error => {
          this.notifyService.publishMessages(error.errors, 'danger', 1);

        });
      } else {
        this.teacherService.updateTeacher(this.id, result).subscribe((data: any) => {
          console.log('employee added', data);
          if (data.hasErrors === false) {
            this.notifyService.publishMessages(data.description, 'info', 1);
            sessionStorage.removeItem('employee-personal-data');
            sessionStorage.removeItem('Employee-Data');
            sessionStorage.removeItem('employee-contact-details');
            sessionStorage.removeItem('employee-education');
            sessionStorage.removeItem('employee-next-kin');
            sessionStorage.removeItem('employee-experience');
            this.router.navigateByUrl('/school/employees');
          }
        }, error => {
          this.notifyService.publishMessages(error.errors, 'danger', 1);

        });
      }

    } else if (result.StaffType !== '1') {
      if (this.formBtn.type === 'create') {
        console.log('all employee data', result);
        this.staffService.addStaff(result).subscribe((data: any) => {
          console.log('employee added', data);
          if (data.hasErrors === false) {
            this.notifyService.publishMessages(data.description, 'info', 1);
            sessionStorage.removeItem('employee-personal-data');
            sessionStorage.removeItem('Employee-Data');
            sessionStorage.removeItem('employee-contact-details');
            sessionStorage.removeItem('employee-education');
            sessionStorage.removeItem('employee-next-kin');
            sessionStorage.removeItem('employee-experience');
            this.router.navigateByUrl('/school/employees');
          }
        }, error => {
          this.notifyService.publishMessages(error.errors, 'danger', 1);

        });
      } else {
        console.log('all employee data', result);
        this.staffService.updateStaff(this.id, result).subscribe((data: any) => {
          console.log('employee added', data);
          if (data.hasErrors === false) {
            this.notifyService.publishMessages(data.description, 'info', 1);
            sessionStorage.removeItem('employee-personal-data');
            sessionStorage.removeItem('Employee-Data');
            sessionStorage.removeItem('employee-contact-details');
            sessionStorage.removeItem('employee-education');
            sessionStorage.removeItem('employee-next-kin');
            sessionStorage.removeItem('employee-experience');
            this.router.navigateByUrl('/school/employees');
          }
        }, error => {
          this.notifyService.publishMessages(error.errors, 'danger', 1);

        });
      }

    }
  }



  handlePhotoUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.profilephotoname = file.name;
      this.DocumentTypes[0] = 2;

      this.mediaForm.get('profile').setValue(file);
      // this.iconname = this.icon.name;
      const size = event.target.files[0].size;
      if (size >= 1048576) {
        this.notifyService.publishMessages('File size too large', 'danger', 1);
        this.DocumentTypes[0] = 0;
      } else  {
        this.DocumentTypes[0] = 2;
        console.log(this.DocumentTypes);
      }
    }
  }

  handleSignatureUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.signaturename = file.name;
      this.DocumentTypes[1] = 8;

      this.mediaForm.get('signature').setValue(file);
      const size = event.target.files[0].size;
      if (size >= 1048576) {
        this.notifyService.publishMessages('File size too large', 'danger', 1);
        this.DocumentTypes[1] = 0;
      } else  {
        this.DocumentTypes[1] = 8;
        console.log(this.DocumentTypes);
      }
      // this.iconname = this.icon.name;
    }
  }

  prevStep() {
    this.home.stepper(6);
    // this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    // this.currentStep.classList.remove('active');
  }
}
