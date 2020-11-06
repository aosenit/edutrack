import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';


@Component({
  selector: 'app-school-login',
  templateUrl: './school-login.component.html',
  styleUrls: ['./school-login.component.css']
})
export class SchoolLoginComponent implements OnInit {

  submitted = false;
  schoolLoginForm: FormGroup;
  constructor(
              private fb: FormBuilder,
              private router: Router,
              private notifyService: NotificationsService,
              ) { }

    ngOnInit() {
    this.schoolLoginForm = this.fb.group({
      username : ['', Validators.required],
      password: ['', [Validators.minLength(5), Validators.required]],
    });
  }

  submit() {
    if (this.schoolLoginForm.invalid) {
      this.submitted = true;
      return;
    } else {
      console.log('login successful', this.schoolLoginForm.value);
      this.notifyService.publishMessages('login successful', 'success', 1);
      this.router.navigateByUrl('/school');
      // location.reload();
    }
  }

}
