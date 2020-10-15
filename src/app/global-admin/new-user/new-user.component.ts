import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';



@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  constructor(
              private fb: FormBuilder,
              private router: Router,
              private notifyService: NotificationsService,
              ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      fname : ['', Validators.required],
      lname : ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      photo: [null],
      role: ['', Validators.required],
    });
  }

  createUser() {
    if (this.userForm.invalid) {
      this.submitted = true;

      return;
    } else {
      console.log('new user succesfful created', this.userForm.value);
      this.notifyService.publishMessages('new user succesfful created', 'success', 1);

      this.router.navigateByUrl('/admin/users');
    }
  }

  back() {
    window.history.back();
  }

}
