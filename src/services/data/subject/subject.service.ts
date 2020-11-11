import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addsubject: 'schtrack-learning/api/v1/Subject/NewSubject',
  getallclass: 'schtrack-learning/api/v1/Subject/GetAllSubjects ',

};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  addNewSubject(result) {
    const tenantId = '1';
    const url = `${this.baseUrl + routes.addsubject}`;
    console.log(url);
    return this.http.post(url, result,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'),  tenantId} });
  }
}
