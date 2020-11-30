import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addAssignment: 'schtrack-learning/api/v1/Assignment/UploadAssignment',
  getAssignmentByTeacher: 'schtrack-learning/api/v1/Assignment/GetAssignmentsByTeacher',
  getAssignmentByClass: 'schtrack-learning/api/v1/Assignment/GetAssignmentsByClass',
  getAssignmentDetails: 'schtrack-learning/api/v1/Assignment/GetAssignmentDetail',

};

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addAssignment(result) {
    const tenantId = '1';
    const body = new FormData();
    body.append('Title', result.Title);
    body.append('ClassSubjectId', result.ClassSubjectId);
    body.append('DueDate', result.DueDate);
    body.append('TotalScore', result.TotalScore);
    body.append('Comment', result.Comment);
    body.append('Document', result.Document);
    const url = `${this.baseUrl + routes.addAssignment}`;
    return this.http.post(url, body,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getAssignmentByTeacher() {
    const tenantId = '1';
    const url = `${this.baseUrl + routes.getAssignmentByTeacher}`;
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });

  }

  getAssignmentByClass(id: any) {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.getAssignmentByClass}?id=${id}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });

  }

  getAssignmentDetails(id: any) {
    const tenantId = '1';

    const url = `${this.baseUrl + routes.getAssignmentDetails}?id=${id}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });

  }
}
