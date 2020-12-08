import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addsession: 'schtrack-assessment/api/v1/SessionSetup/AddSchoolSession',
  getschoolSessions: 'schtrack-assessment/api/v1/SessionSetup/GetSchoolSessions',
  getcurrentsession: 'schtrack-assessment/api/v1/SessionSetup/GetCurrentSchoolSessions'
};


@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addProperty( result) {
    const url = `${this.baseUrl + routes.addsession}`;
    return this.http.post(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getSchoolSessions() {
    const url = `${this.baseUrl + routes.getschoolSessions}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getCurrentSession() {
    const url = `${this.baseUrl + routes.getschoolSessions}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

}
