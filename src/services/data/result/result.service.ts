import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  getstudentandassessment: 'schtrack-assessment/api/v1/Result/GetResultUploadFormData',
  generateReport: 'schtrack-assessment/api/v1/Result/GetResultUploadFormData',
  generateExcel: 'schtrack-assessment/api/v1/Result/GetResultUploadExcel',
  uploadexcelresult: 'schtrack-assessment/api/v1/Result/PostResultFromExcel',
  uploadResultFromForm: 'schtrack-assessment/api/v1/Result/UploadAssessmentSetups',
  getclassbroadsheet: 'schtrack-assessment/api/v1/Result/GetClassBroadSheet',
  getstudentbroadsheet: 'schtrack-assessment/api/v1/Result/GetStudentBroadSheet',
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
    return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  UploadExcelResult(excelDataForm) {
    const body = new FormData();
    body.append('SchoolClassId', excelDataForm.SchoolClassId);
    body.append('SubjectId', excelDataForm.SubjectId);
    body.append('ExcelFile', excelDataForm.ExcelFile);

    const url = `${this.baseUrl + routes.uploadexcelresult}`;
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.http.post(url, body, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }

  UploadAssessmentSetup(result) {

    const url = `${this.baseUrl + routes.uploadResultFromForm}`;
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.http.post(url, result, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getClassBroadSheet(id) {
    const url = `${this.baseUrl + routes.getclassbroadsheet}/${id}`;
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getStudentBroadSheet(studId, classId) {
    const url = `${this.baseUrl + routes.getstudentbroadsheet}?studId=${studId}&classId=${classId}`;
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

}
