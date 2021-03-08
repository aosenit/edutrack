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
  createstudentbehaviour: 'schtrack-assessment/api/v1/Result/PostBehaviourResult',
  viewstudentbehaviour: 'schtrack-assessment/api/v1/Result/GetBehaviourResult',
  getapprovedResult: 'schtrack-assessment/api/v1/Result/GetApprovedStudentReportSheet',
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
    const url = `${this.baseUrl + routes.generateReport}?classId=${classId}&className=${className}`;
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
    return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getStudentBroadSheet(studId, classId) {
    const url = `${this.baseUrl + routes.getstudentbroadsheet}?studId=${studId}&classId=${classId}`;
    console.log(url);
    // tslint:disable-next-line:max-line-length
    return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }


  createStudentBehaviour(behaviourData) {
      const url = `${this.baseUrl + routes.createstudentbehaviour}`;
      // tslint:disable-next-line:max-line-length
      return this.http.post(url, behaviourData, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
 }

 getStudentBehviour(SessionId, TermSequence, ClassId, StudentId) {
  // tslint:disable-next-line:max-line-length
  const url = `${this.baseUrl + routes.viewstudentbehaviour}?SessionId=${SessionId}&TermSequence=${TermSequence}&ClassId=${ClassId}&StudentId=${StudentId}`;
  return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
 }

 getApprovedStudentResult(classId, sessionId, termSequenceNumber) {
  // tslint:disable-next-line:max-line-length
  const url = `${this.baseUrl + routes.getapprovedResult}?classId=${classId}&sessionId=${sessionId}&termSequenceNumber=${termSequenceNumber}`;
  return this.http.get(url, {  headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

 }


}
