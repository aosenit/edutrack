import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { FormBuilder } from '@angular/forms';

const routes = {
  newAdmin: 'schtrack-auth/api/v1/Admin',
  getAdmins: 'schtrack-auth/api/v1/Admin?PageIndex=1&PageSize=15',
  getAllPermissions: 'schtrack-auth/api/v1/Role/GetAllPermissions',
  createRoles: 'schtrack-auth/api/v1/Role/CreateRole',
  getRoles: 'schtrack-auth/api/v1/Role/GetRoles',
  assignRoles: 'schtrack-auth/api/v1/Role/AddUserToRole'
};
// const routes = {
//   newAdmin: 'api/v1/Admin',
//   getAdmins: 'schtrack-auth/api/v1/Admin?PageIndex=1&PageSize=15',
//   getAllPermissions: 'schtrack-auth/api/Role/GetAllPermissions'
//   // getAdmins: 'api/v1/Admin?PageIndex=1&PageSize=10',
// };

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  AddNewAdmin(userForm) {
    const body = new FormData();
    body.append('firstName', userForm.firstName);
    body.append('lastName', userForm.lastName);
    body.append('userName', userForm.userName);
    body.append('email', userForm.email);
    body.append('Files', userForm.image);
    userForm.DocumentTypes.forEach((item) => body.append('DocumentTypes', item));
    body.append('phoneNumber', userForm.phoneNumber);
    const url = `${this.baseUrl + routes.newAdmin}`;
    return this.http.post(url, body );
  }

  getAllAdmin() {
    const url = `${this.baseUrl + routes.getAdmins}`;
    return this.http.get(url );
  }

  getAllPermissions() {
    const url = `${this.baseUrl + routes.getAllPermissions}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  createRoles(roleData) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.createRoles}`;
    return this.http.post(url, roleData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});

  }

  getRoles() {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getRoles}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }});
  }

  assignRolesToUsers(form) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.assignRoles}`;
    return this.http.post(url, form,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId }} );
  }

}
