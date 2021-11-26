import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationsService } from 'src/services/classes/notifications/notifications.service';
import { SchoolService } from 'src/services/data/school/school.service';
import { GroupedSchoolsComponent } from '../grouped-schools.component';

@Component({
  selector: 'app-school-media',
  templateUrl: './school-media.component.html',
  styleUrls: ['./school-media.component.css']
})
export class SchoolMediaComponent implements OnInit {
  logoname = null;
  iconname = null;
  mediaForm: FormGroup;
  id: any;
  DocumentTypes: number[] = [];
  formBtn = {
    type: 'create',
    text: 'Create Client'
  };
  currentStep: any;
  step: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notifyService: NotificationsService,
    private schoolServies: SchoolService,
    private home: GroupedSchoolsComponent) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    // // ('page id', this.id);
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.createMediaForm();
      } else {
        this.updateMediaForm();
        this.getProfileInformation();
      }
    });
  }

  // detectFromButtonType() {
  //   if (this.formBtn.type === 'create' ) {
  //     this.createSchool();
  //   } else {
  //     this.UpdateCLientForm();
  //   }
  // }

  createMediaForm() {
    this.mediaForm = this.fb.group({
      logo: [null],
      icon: [null],
      PrimaryColor: [''],
      SecondaryColor: ['']
    });
  }
  updateMediaForm() {
    this.mediaForm = this.fb.group({
      logo: [null],
      icon: [null],
      PrimaryColor: [''],
      SecondaryColor: ['']
    });

    this.formBtn = {
      type: 'Update',
      text: 'Update Client'
    };
  }

  createSchool() {
    const profile = JSON.parse(sessionStorage.getItem('grouped-profile-info'));
    const contactperson = JSON.parse(sessionStorage.getItem('grouped-contact-person'));
    const finalstep = this.mediaForm.value;
    const isActive = true;

    // const formData = new FormData();
    // this.DocumentTypes.forEach((item: any) => formData.append('DocumentTypes', item));


    const result = { ...profile, ...contactperson, ...finalstep, isActive, DocumentTypes: this.DocumentTypes };
    console.log(result);

    if (this.formBtn.type === 'create') {
      this.schoolServies.addSchoolGroup(result).subscribe((data: any) => {
        if (data.hasErrors === false) {
          // console.log('school create successfully', data);
          this.notifyService.publishMessages(data.description, 'info', 1);
          sessionStorage.removeItem('grouped-profile-info');
          sessionStorage.removeItem('grouped-contact-person');
          this.router.navigateByUrl('/admin/clients');
        } else {
          // console.log(data);
          this.notifyService.publishMessages(data.errors, 'danger', 1);
        }
      }, error => {
        // console.log(error);
        this.notifyService.publishMessages(error, 'danger', 1);

      });
    } else {
      this.schoolServies.updateSchool(this.id, result).subscribe((data: any) => {
        if (data.hasErrors === false) {
          // console.log('school edited successfully', data);
          this.notifyService.publishMessages(data.description, 'info', 1);
          sessionStorage.removeItem('profile-info');
          sessionStorage.removeItem('school-details');
          sessionStorage.removeItem('contact-person');
          this.router.navigateByUrl('/admin/clients');
        }
      }, error => {
        this.notifyService.publishMessages(error.errors, 'danger', 1);

      });

    }
  }


  handleImgUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log('file', file);
      // this.iconname = this.icon.name;
        const size = event.target.files[0].size;
      if (size >= 1048576) {
        this.notifyService.publishMessages('File size too large', 'danger', 1);
      } else {
        this.logoname = file.name;
        this.mediaForm.get('logo').setValue(file);
        this.DocumentTypes.push(0);

      }
    }
  }

  handleIconUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // // ('file', file);
      const size = event.target.files[0].size;
      if (size >= 1048576) {
        this.notifyService.publishMessages('File size too large', 'danger', 1);
      } else {
        this.iconname = file.name;
        this.mediaForm.get('icon').setValue(file);
        this.DocumentTypes.push(1);

      }
      // this.iconname = this.icon.name;
    }
  }
  // handleIconUpload(event: any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     // // ('file', file);
  //     this.iconname = file.name;
  //     this.mediaForm.get('icon').setValue(file);
  //     // ('init doc ', this.DocumentTypes);
  //     const size = event.target.files[0].size;
  //     if (size >=  1048576 ) {
  //       this.notifyService.publishMessages('File size too large', 'danger', 1);
  //     } else {
  //       this.DocumentTypes.push(1);
  //       // (this.DocumentTypes);

  //     }
  //     if (this.DocumentTypes.length > 1) {
  //       this.DocumentTypes.shift();
  //     }
  //   }
  // }


  getProfileInformation() {
    const payload = JSON.parse(sessionStorage.getItem('client-info'));
    // console.log('na the paylod', payload);
    // this.populateEditProfileForm(payload);
    this.mediaForm.patchValue({
      PrimaryColor: payload.primaryColor,
      SecondaryColor: payload.secondaryColor
    });
  }

  prevStep() {
    this.home.stepper(3);
    this.currentStep = document.getElementById('step-' + `${3 + 1}`);
    this.currentStep.classList.remove('active');

  }

}
