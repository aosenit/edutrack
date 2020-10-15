import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from '../../../../services/classes/notifications/notifications.service';


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
    console.log('create school', this.schoolFinalStep.value);
    sessionStorage.setItem('final-info', JSON.stringify(this.schoolFinalStep.value));
    const profile = JSON.parse(sessionStorage.getItem('profile-info'));
    const details = JSON.parse(sessionStorage.getItem('school-details'));
    const finalstep = JSON.parse(sessionStorage.getItem('final-info'));
    const result = {...profile, ...details, ...finalstep};
    console.log('result', result);
    this.notifyService.publishMessages('Great! Client added successfully', 'success', 1);

    this.router.navigateByUrl('/admin/clients');
  }

}
