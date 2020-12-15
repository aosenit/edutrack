import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  getstudentandassessment: 'schtrack-assessment/api/v1/Result/GetResultUploadFormData',
  generateReport: 'schtrack-assessment/api/v1/Result/GetResultUploadFormData',
  generateExcel: 'schtrack-assessment/api/v1/Result/GetResultUploadExcel',
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

  generateExcel(classId, className) {
    const url = `${this.baseUrl + routes.generateExcel}?classId=${classId}&?className=${className}`;
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.http.get(url, { responseType: 'blob' , headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
    //   const a = document.createElement('a');
    //   a.href = URL.createObjectURL(data.blob());
    //   a.download = __filename;
    //       // start download
    //   a.click();
    // });

  }

}
