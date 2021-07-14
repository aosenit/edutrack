import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  avatarname = null;
  DocumentTypes: number[] = [];
  pageId: any;
  newUser = true;
  editUser = false;
  edituserForm: FormGroup;


  constructor(
              private fb: FormBuilder,
              private router: Router,
              private notifyService: NotificationsService,
              private adminService: AdminService,
              private route: ActivatedRoute
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

    this.edituserForm = this.fb.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      image: [null],
      phoneNumber: ['', Validators.required],
    });

    this.pageId = this.route.snapshot.params.id;
    this.route.params.subscribe((param: Params) => {
      if (!param.id) {
        this.newUser = true;
      } else {
        // this.getProfileInformation();
        this.getUserById();
        this.newUser = false;
        this.editUser = true;

      }
    });
  }

  createUser() {
    if (this.userForm.invalid) {
      this.submitted = true;
      return;
    } else {
      // // (this.userForm.value);
      const finalstep = this.userForm.value;
      const result = { ...finalstep, DocumentTypes: this.DocumentTypes};
      this.adminService.AddNewAdmin(result).subscribe( (data: any) => {
        if (data.hasErrors === false) {
          // ('created admin data', data);
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
      // ('file', file);
      this.avatarname = file.name;
      this.userForm.get('image').setValue(file);
      this.DocumentTypes.push(2);

      // this.iconname = this.icon.name;
    }
  }

  getUserById() {
    this.adminService.getAdminByID(this.pageId).subscribe((data: any) => {
      if (data.hasErrors === false ) {
          // (data.payload);
          this.edituserForm.patchValue({
            firstName : data.payload.firstName,
            lastName : data.payload.lastName,
            // userName: data.payload,
            email: data.payload.email,
            // phoneNumber: data.payl,
          });
      }
    });
  }

  editCreateuser() {

   
      // // (this.userForm.value);
      const finalstep = this.userForm.value;
      const result = { ...finalstep, DocumentTypes: this.DocumentTypes};
      this.adminService.updateAdmin(this.pageId, result).subscribe( (data: any) => {
        if (data.hasErrors === false) {
          // ('created admin data', data);
          this.notifyService.publishMessages(data.description, 'info', 1);
          this.router.navigateByUrl('/admin/users');
        }
      }, err => {
        this.notifyService.publishMessages(err.errors, 'danger', 1);

      });
    
  }

  back() {
    window.history.back();
  }

}
