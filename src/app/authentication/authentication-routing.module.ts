import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from 'src/services/guards/auth-guard.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { EmailVerifiedComponent } from './email-verified/email-verified.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SchoolLoginComponent } from './school-login/school-login.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TeacherLoginComponent } from './teacher-login/teacher-login.component';


const routes: Routes = [
  {path: 'login', component: AdminLoginComponent },
  {path: 'teacher/login', component: TeacherLoginComponent},
  {path: 'student/login', component: StudentLoginComponent},
  {path: 'school/login', component: SchoolLoginComponent},
  {path: 'forgotpassword', component: ForgotPasswordComponent},
  {path: 'email-verified', component: EmailVerifiedComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
