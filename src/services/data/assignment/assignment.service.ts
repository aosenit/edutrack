import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addAssignment: 'schtrack-learning/api/v1/Assignment/UploadAssignment',
  getAssignmentByTeacher: 'schtrack-learning/api/v1/Assignment/GetAssignmentsByTeacher',
  getAssignmentByClass: 'schtrack-learning/api/v1/Assignment/GetAssignmentsByClass',
  getAssignmentDetails: 'schtrack-learning/api/v1/Assignment/GetAssignmentDetail',
  getAssignmentByClassSubject: 'schtrack-learning/api/v1/Assignment/GetAssignmentsByClassSubject',
  submitStudentAssignment: 'schtrack-learning/api/v1/AssignmentAnswer/UploadAssignmentAnswer',
  updatecomment: 'schtrack-learning/api/v1/AssignmentAnswer/UpdateComment',
  updatescore: 'schtrack-learning/api/v1/AssignmentAnswer/UpdateScore'

};

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addAssignment(result) {
    const body = new FormData();
    body.append('Title', result.Title);
    body.append('ClassSubjectId', result.ClassSubjectId);
    body.append('DueDate', result.DueDate);
    body.append('TotalScore', result.TotalScore);
    body.append('Comment', result.Comment);
    body.append('Document', result.Document);
    const url = `${this.baseUrl + routes.addAssignment}`;
    return this.http.post(url, body,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getAssignmentByTeacher(p, perpage) {
    const url = `${this.baseUrl + routes.getAssignmentByTeacher}?PageIndex=${p}&PageSize=${perpage}`;
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getAssignmentByClass(id: any) {

    const url = `${this.baseUrl + routes.getAssignmentByClass}?classId=${id}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getAssignmentDetails(id: any) {

    const url = `${this.baseUrl + routes.getAssignmentDetails}?id=${id}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getAssignmentsByClassSubject(classSubjectId: number) {

    const url = `${this.baseUrl + routes.getAssignmentByClassSubject}?classSubjectId=${classSubjectId}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  submitStudentAssignment(result) {
    // const tenantId = '1';

    const body = new FormData();
    body.append('AssignmentId', result.AssignmentId);
    body.append('Document', result.Document);
    const url = `${this.baseUrl + routes.submitStudentAssignment}`;
    return this.http.post(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  updateComment(result) {
    const url = `${this.baseUrl + routes.updatecomment}`;
    return this.http.put(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateScore(result) {
    const url = `${this.baseUrl + routes.updatescore}`;
    
    return this.http.put(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
}
