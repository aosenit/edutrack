import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  getstudentandassessment: 'schtrack-assessment/api/v1/Result/GetResultUploadFormData',
  generateReport: 'schtrack-assessment/api/v1/Result/GetResultUploadFormData',
};
@Injectable({
  providedIn: 'root'
})
export class ResultService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  getStudentandAssement( id) {
    const url = `${this.baseUrl + routes.getstudentandassessment}?classId=${id}`;
    console.log(url);
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  generateReport(classId, className) {
    const url = `${this.baseUrl + routes.generateReport}?classId=${classId}&?className=${className}`;
    console.log(url);
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

}
