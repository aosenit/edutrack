import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addsubject: 'schtrack-learning/api/v1/Subject/NewSubject',
  addsubjectToClass: 'schtrack-learning/api/v1/ClassSubject/AddSubjectsToClass',
  getallSubjects: 'schtrack-learning/api/v1/Subject/GetAllSubjects',
  // getsinglesubject: 'schtrack-learning/api/v1/Subject/GetAllSubjects ',
  getPaginatedSubject: 'schtrack-learning/api/v1/Subject/GetSubjects',
  editsubject: 'schtrack-learning/api/v1/Subject/UpdateSubject'
};

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  addNewSubject(result) {
    const url = `${this.baseUrl + routes.addsubject}`;
    return this.http.post(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  addNewSubjectToClass(result) {
    const url = `${this.baseUrl + routes.addsubjectToClass}`;
    return this.http.post(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAllSubjects() {
    const url = `${this.baseUrl + routes.getallSubjects}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }
  getAllSubjectsNoPagination() {
    const url = `${this.baseUrl + routes.getPaginatedSubject}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getPaginatedSubject(p, perpage) {
    const url = `${this.baseUrl + routes.getPaginatedSubject}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }


  updateSubjects(payload) {
    const url = `${this.baseUrl + routes.editsubject}`;
    return this.http.put(url, payload, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }
}
