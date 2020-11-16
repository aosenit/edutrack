import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from './../../../services/classes/notifications/notifications.service';
import {AdminService} from '../../../services/data/admin/admin.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;
  avatarname = null;
  DocumentTypes: number[] = [];

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
      userName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      image: [null],
      phoneNumber: ['', Validators.required],
    });
  }

  createUser() {
    if (this.userForm.invalid) {
      this.submitted = true;
      return;
    } else {
      // console.log(this.userForm.value);
      const finalstep = this.userForm.value;
      const result = { ...finalstep, DocumentTypes: this.DocumentTypes};
      this.adminService.AddNewAdmin(result).subscribe( (data: any) => {
        if (data.hasErrors === false) {
          console.log('created admin data', data);
          this.notifyService.publishMessages(data.description, 'info', 1);
          this.router.navigateByUrl('/admin/users');
        }
      }, err => {
        this.notifyService.publishMessages(err.errors, 'danger', 1);

      });
    }
  }

  handleImgUpload(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('file', file);
      this.avatarname = file.name;
      this.userForm.get('image').setValue(file);
      this.DocumentTypes.push(2);

      // this.iconname = this.icon.name;
    }
  }
  
  back() {
    window.history.back();
  }
}
