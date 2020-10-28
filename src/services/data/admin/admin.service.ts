import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

const routes = {
  newAdmin: 'schtrack-auth/api/v1/Admin',
  getAdmin: 'schtrack-auth/api/v1/Admin'
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

  getAllAdmin() {
        const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*'});
        const url = `${this.baseUrl + routes.getAdmin}`;
        return this.http.get(url, {headers});
  }
}
