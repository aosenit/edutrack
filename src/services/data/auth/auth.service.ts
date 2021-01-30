import { HttpClient , HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const routes = {
  login: 'schtrack-auth/api/v1/Authentication/Token',
  forgotPassword: 'schtrack-auth/api/v1/Authentication/RequestPasswordReset',
  verifyEmail: 'schtrack-auth/api/v1/Authentication/ConfirmEmail'

};

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  loginAdmin(LoginForm) {
    // const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*'});
    const url = `${this.baseUrl + routes.login}`;
    const {username , password} = LoginForm; // destructure the login object
    const body = new HttpParams()
    .set('grant_type', 'password')
    .set('username', username)
    .set('password', password);
    return this.http.post(url, body, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }, );
  }

  resetPassword(resetPasswordForm) {
    const body = new FormData();
    body.append('email', resetPasswordForm.email);
    const url = `${this.baseUrl + routes.forgotPassword}`;
    return this.http.post(url, body);

  }

  verifyUserEmail(userId, code) {
    const url = `${this.baseUrl + routes.verifyEmail}?userId=${userId}&code=${code}`;
    return this.http.get(url);

  }

  // logOut(token) {
  //   const url = `${this.baseUrl + routes.resetPassword}`;
  //   return this.http.post(url, token);
  //   // sessionStorage.removeItem('admin');
  //   // this.router.navigate(['/']);
  // }
}
