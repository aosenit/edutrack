import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addsession: 'schtrack-assessment/api/v1/SessionSetup/AddSchoolSession',
  editsession: 'schtrack-assessment/api/v1/SessionSetup/UpdateSchoolSession',
  getschoolSessions: 'schtrack-assessment/api/v1/SessionSetup/GetSchoolSessions',
  getcurrentsession: 'schtrack-assessment/api/v1/SessionSetup/GetCurrentSchoolSessions',
  setupassessment: 'schtrack-assessment/api/v1/AssessmentSetup/UploadAssessmentSetups',
  updateassessment: 'schtrack-assessment/api/v1/AssessmentSetup/UpdateAssessmentSetups',
  getassessmentsetup: 'schtrack-assessment/api/v1/AssessmentSetup/GetAllAssessmentSetup',
  submitStudentResult: 'schtrack-assessment/api/v1/Result/SubmitStudentResult',
  approveStudentsResult: 'schtrack-assessment/api/v1/Result/SubmitClassResultForApproval',
  getAllGradeSetup: 'schtrack-assessment/api/v1/GradeSetup/GetAllGradeForSchoolSetup',
};


@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  addProperty( result) {
    const url = `${this.baseUrl + routes.addsession}`;
    return this.http.post(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
  updateProperty( id, result) {
    const url = `${this.baseUrl + routes.editsession}/${id}`;
    return this.http.post(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getSchoolSessions() {
    const url = `${this.baseUrl + routes.getschoolSessions}`; 
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getCurrentSession() {
    const url = `${this.baseUrl + routes.getcurrentsession}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  setUpAssessment(result) {
    const url = `${this.baseUrl + routes.setupassessment}`;
    return this.http.post(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  updateAssessment(result) {
    const url = `${this.baseUrl + routes.updateassessment}`;
    return this.http.put(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  getAllAssessmentSetup() {
    const url = `${this.baseUrl + routes.getassessmentsetup}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  submitStudentResultForApproval(result) {
    const url = `${this.baseUrl + routes.submitStudentResult}`;
    return this.http.post(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }

  approveClassResult(result) {
    const url = `${this.baseUrl + routes.approveStudentsResult}`;
    return this.http.post(url, result, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});
  }
  getAllGradeSetupForSchool() {

    const url = `${this.baseUrl + routes.getAllGradeSetup}`;
    return this.http.get(url, {headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') }});

  }
}
