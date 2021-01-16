import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addClassWork: 'schtrack-learning/api/v1/ClassWork/UploadFile',
  getClassWorkByTeacher: 'schtrack-learning/api/v1/ClassWork/GetAllFileByTeacher',
  getClassWorkDetails: 'schtrack-learning/api/v1/ClassWork/GetClassWorkDetail',
  getClassWorFiles: 'schtrack-learning/api/v1/ClassWork/GetFileByClassSubject',

};

@Injectable({
  providedIn: 'root'
})
export class ClassWorkService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addClassWork(form) {
    const tenantId = '1';

    const body = new FormData();
    body.append('ClassSubjectId', form.ClassSubjectId);
    body.append('FileObj', form.FileObj);
    body.append('Comment', form.Comment);
    const url = `${this.baseUrl + routes.addClassWork}`;
    return this.http.post(url, body,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getClassWorkByTeacher() {
    const tenantId = '1';
    const url = `${this.baseUrl + routes.getClassWorkByTeacher}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getClassWorkDetails(id: any) {
    const tenantId = '1';
    const url = `${this.baseUrl + routes.getClassWorkDetails}?id=${id}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getClassWorkFiles(id: any) {
    const url = `${this.baseUrl + routes.getClassWorFiles}/?classSubjectId=${id}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
}
