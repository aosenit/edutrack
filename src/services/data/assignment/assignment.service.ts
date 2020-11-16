import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addAssignment: 'schtrack-learning/api/v1/Assignment/UploadAssignment',
  getAssignmentByTeacher: 'schtrack-learning/api/v1/Assignment/GetAssignmentsByTeacher',

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
    body.append('SubjectId', result.SubjectId);
    body.append('ClassId', result.ClassId);
    body.append('TeacherId', result.TeacherId);
    body.append('DueDate', result.DueDate);
    body.append('TotalScore', result.TotalScore);
    body.append('Comment', result.Comment);
    body.append('Document', result.Document);
    const url = `${this.baseUrl + routes.addAssignment}`;
    return this.http.post(url, body,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getAssignmentByTeacher() {

  }
}
