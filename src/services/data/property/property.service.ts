import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addproperty: 'schtrack-auth/api/v1/SchoolProperty/SetSchoolProperty',
  getproperty: 'schtrack-auth/api/v1/SchoolProperty/GetSchoolProperty',
};

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addProperty( result) {
    const url = `${this.baseUrl + routes.addproperty}`;
    return this.http.post(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getProperty() {
    const url = `${this.baseUrl + routes.getproperty}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
}
