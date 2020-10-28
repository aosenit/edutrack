import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';
import {AdminService} from '../../../services/data/admin/admin.service';


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
              private adminService: AdminService
              ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      photo: [null],
      password: ['', Validators.required],
    });
  }

  createUser() {
    if (this.userForm.invalid) {
      this.submitted = true;

      return;
    } else {
      console.log(this.userForm.value);
      this.adminService.AddNewAdmin(this.userForm.value).subscribe( (data: any) => {
        if (data) {
          console.log('dsdsd', data);
          this.notifyService.publishMessages(data.description, 'success', 1);
          this.router.navigateByUrl('/admin/users');
        }
      }, err => {
        this.notifyService.publishMessages(err.errors, 'danger', 1);

      });
    }
  }

  back() {
    window.history.back();
  }

}
