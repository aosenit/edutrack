import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { SchoolLoginComponent } from './school-login/school-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ParentLoginComponent } from './parent-login/parent-login.component';


@NgModule({
  declarations: [ForgotPasswordComponent, AdminLoginComponent, TeacherLoginComponent, StudentLoginComponent, SchoolLoginComponent, EmailVerifiedComponent, ResetPasswordComponent, ParentLoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
