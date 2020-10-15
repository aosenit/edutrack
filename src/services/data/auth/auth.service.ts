import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const routes = {
  login: 'Authentication/login',
  resetPassword: 'Authentication/PasswordReset  ',
  logout: 'Authentication/Logout '
};

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient, private router: Router) { }

  loginAdmin(LoginForm) {
    const url = `${this.baseUrl + routes.login}`;
    return this.http.post(url, this.loginAdmin);
  }

  resetPassword(resetPasswordForm) {
    const url = `${this.baseUrl + routes.resetPassword}`;
    return this.http.post(url, this.resetPassword);

  }

  logOut(token) {
    const url = `${this.baseUrl + routes.resetPassword}`;
    return this.http.post(url, token);
    // sessionStorage.removeItem('admin');
    // this.router.navigate(['/']);
  }
}
