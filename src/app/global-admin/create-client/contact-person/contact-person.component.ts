import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../../services/classes/notifications/notifications.service';
import {SchoolService} from '../../../../services/data/school/school.service';

@Component({
  selector: 'app-contact-person',
  templateUrl: './contact-person.component.html',
  styleUrls: ['./contact-person.component.css']
})
export class ContactPersonComponent implements OnInit {

  schoolFinalStep: FormGroup;
  constructor(
              private fb: FormBuilder,
              private router: Router,
              private notifyService: NotificationsService,
              private schoolServies: SchoolService
              ) { }

  ngOnInit() {
    this.schoolFinalStep = this.fb.group({
      ContactFirstName : ['', Validators.required],
      ContactLastName: ['', Validators.required],
      ContactPhoneNo: ['', [Validators.required]],
      ContactEmail: ['', [Validators.email, Validators.required]]
    });
  }

  createSchool() {
    sessionStorage.setItem('final-info', JSON.stringify(this.schoolFinalStep.value));
    const profile = JSON.parse(sessionStorage.getItem('profile-info'));
    const details = JSON.parse(sessionStorage.getItem('school-details'));
    const finalstep = JSON.parse(sessionStorage.getItem('final-info'));
    const result = {...profile, ...details, ...finalstep};
    console.log('result', result);
    // const formData = this.assignFormDataValues(result);
    // console.log('ff', formData);
    this.schoolServies.addSchool(result).subscribe( (data: any) => {
      if ( data) {
          console.log('school create successfully', data);
          this.notifyService.publishMessages('Great! Client added successfully', 'info', 1);
          this.router.navigateByUrl('/admin/clients');
      }
    }, error => {
      console.log('Error occured here', error);
      this.notifyService.publishMessages(error.message, 'danger', 1);

    });

  }

  assignFormDataValues(form: FormGroup) {
    const formData = new FormData();
    Object.keys(form.controls).forEach(key => {
      formData.append(key, form.get(key).value);
    });
    return formData;
  }

}
