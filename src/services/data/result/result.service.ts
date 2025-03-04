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
  getstudentResultFromTeacher: 'schtrack-assessment/api/v1/Result/GetClassBroadSheetApprovedByClassTeacher',
  createstudentbehaviour: 'schtrack-assessment/api/v1/Result/PostBehaviourResult',
  viewstudentbehaviour: 'schtrack-assessment/api/v1/Result/GetBehaviourResult',
  getapprovedResult: 'schtrack-assessment/api/v1/Result/GetApprovedStudentReportSheet',
  getapprovedStudentResult: 'schtrack-assessment/api/v1/Result/GetStudentsWithApprovedResult',
  mailreportsheet: 'schtrack-assessment/api/v1/Result/PostMailResult',
  exportBroadSheetExcel:'schtrack-assessment/api/v1/Result/ExportBroadSheetExcel',
  exportBroadSheetPdf:'schtrack-assessment/api/v1/Result/ExportBroadSheetPDF',
  viewAllClassApprovalStatus: 'schtrack-assessment/api/v1/Result/GetClassesResultApproval'
};
@Injectable({
  providedIn: 'root'
})
export class ResultService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  getStudentandAssement(id) {
    const url = `${this.baseUrl + routes.getstudentandassessment}?classId=${id}`;

    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  generateReport(classId, className) {
    const url = `${this.baseUrl + routes.generateReport}?classId=${classId}&className=${className}`;

    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  generateExcel(classId, className) {
    const url = `${this.baseUrl + routes.generateExcel}?classId=${classId}&?className=${className}`;

    // tslint:disable-next-line:max-line-length
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  UploadExcelResult(excelDataForm) {
    const body = new FormData();
    body.append('SchoolClassId', excelDataForm.SchoolClassId);
    body.append('SubjectId', excelDataForm.SubjectId);
    body.append('ExcelFile', excelDataForm.ExcelFile);

    const url = `${this.baseUrl + routes.uploadexcelresult}`;

    // tslint:disable-next-line:max-line-length
    return this.http.post(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  UploadAssessmentSetup(result) {

    const url = `${this.baseUrl + routes.uploadResultFromForm}`;

    // tslint:disable-next-line:max-line-length
    return this.http.post(url, result, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getClassBroadSheet(id) {
    const url = `${this.baseUrl + routes.getclassbroadsheet}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getStudentBroadSheet(studId, classId) {
    const url = `${this.baseUrl + routes.getstudentbroadsheet}?studId=${studId}&classId=${classId}`;

    // tslint:disable-next-line:max-line-length
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getStudentBroadSheetApprovedByTEacher(classId) {
    const url = `${this.baseUrl + routes.getstudentResultFromTeacher}/${classId}`;

    // tslint:disable-next-line:max-line-length
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }


  createStudentBehaviour(behaviourData) {
    const url = `${this.baseUrl + routes.createstudentbehaviour}`;
    // tslint:disable-next-line:max-line-length
    return this.http.post(url, behaviourData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getStudentBehviour(SessionId, TermSequence, ClassId, StudentId) {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl + routes.viewstudentbehaviour}?SessionId=${SessionId}&TermSequence=${TermSequence}&ClassId=${ClassId}&StudentId=${StudentId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  getBehaviourForStudent(SessionId, TermSequence, ClassId, studUserId) {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl + routes.viewstudentbehaviour}?SessionId=${SessionId}&TermSequence=${TermSequence}&ClassId=${ClassId}&studUserId=${studUserId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getApprovedStudentResult(studId, classId, sessionId, termSequenceNumber) {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl + routes.getapprovedResult}?studId=${studId}&classId=${classId}&sessionId=${sessionId}&termSequenceNumber=${termSequenceNumber}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getApprovedResultForStudent(studUserId, classId, sessionId, termSequenceNumber) {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl + routes.getapprovedResult}?studUserId=${studUserId}&classId=${classId}&sessionId=${sessionId}&termSequenceNumber=${termSequenceNumber}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  getStudentApprovedResults(classId, sessionId, termSequenceNumber) {
    // tslint:disable-next-line:max-line-length
    const url = `${this.baseUrl + routes.getapprovedStudentResult}?classId=${classId}&sessionId=${sessionId}&termSequenceNumber=${termSequenceNumber}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  mailReportSheetToParent(mailData) {
    const url = `${this.baseUrl + routes.mailreportsheet}`;
    return this.http.post(url, mailData, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  GetAllClassResultApprovalStatus(curSessionId, termSequenceNumber) {
    const url = `${this.baseUrl + routes.viewAllClassApprovalStatus}?curSessionId=${curSessionId}&termSequenceNumber=${termSequenceNumber}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  exportBroadsheetExcel(id){
    const url = `${this.baseUrl + routes.exportBroadSheetExcel}?id=${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }
  exportBroadsheetPdf(id){
    const url = `${this.baseUrl + routes.exportBroadSheetPdf}?id=${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

}
