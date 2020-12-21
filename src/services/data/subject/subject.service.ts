import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addsubject: 'schtrack-learning/api/v1/Subject/NewSubject',
  getallSubjects: 'schtrack-learning/api/v1/Subject/GetAllSubjects ',
  getPaginatedSubject: 'schtrack-learning/api/v1/Subject/GetSubjects',

};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  addNewSubject(result) {
    // const body = new FormData();
    // body.append('ClassIds', result.ClassIds);
    // body.append('Name', result.Name);

    // body.append('IsActive', result.IsActive);
    const url = `${this.baseUrl + routes.addsubject}`;
    return this.http.post(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllSubjects() {
    const url = `${this.baseUrl + routes.getallSubjects}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getPaginatedSubject(p, perpage) {
    const url = `${this.baseUrl + routes.getPaginatedSubject}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }
}
