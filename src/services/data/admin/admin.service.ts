import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const routes = {
  newAdmin: 'api/v1/Admin',
  getAdmins: 'schtrack-auth/api/v1/Admin',
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // baseUrl: string = environment.serverUrl;
  baseUrl: string = environment.demourl;


  constructor(private http: HttpClient) { }

  AddNewAdmin(userForm) {
    const body = new FormData();
    body.append('firstName', userForm.firstName);
    body.append('lastName', userForm.lastName);
    body.append('userName', userForm.userName);
    body.append('email', userForm.email);
    body.append('Files', userForm.Document);
    body.append('password', userForm.password);

    const url = `${this.baseUrl + routes.newAdmin}`;
    return this.http.post(url, body );
  }

  getAllAdmin() {
    const url = `${this.baseUrl + routes.getAdmins}`;
    return this.http.get(url );
  }

}
