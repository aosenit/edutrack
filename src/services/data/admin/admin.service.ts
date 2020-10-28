import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const routes = {
  newAdmin: 'schtrack-auth/api/v1/Admin',
  getAdminById: 'schtrack-auth/api/v1/Admin'
};

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  AddNewAdmin(userForm) {
    const url = `${this.baseUrl + routes.newAdmin}`;
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*'});
    return this.http.post(url, userForm, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } );
  }

  getloggedInAdmin(id: any) {
        const url = `${this.baseUrl + routes.getAdminById}/${id}`;
        return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
}
