import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const tenantId = '1';
const routes = {
  getStudentSubjectAttendance:'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForSubject',
  getStudentClassAttendance:'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForClass',
  getStudentAttendanceSummary:'schtrack-learning/api/v1/Attendance/GetStudentAttendanceSummary',
  getClassAttendanceWithDateSummary: 'schtrack-learning/api/v1/Attendance/GetClassAttendanceWithDateSummary',
  getClassSubjectAttendanceWithDateSummary:'schtrack-learning/api/v1/Attendance/GetClassSubjectAttendanceWithDateSummary',
  exportAttendance: 'schtrack-learning/api/v1/Attendance/AttendanceExport',
  exportAttendancePdf:'schtrack-learning/api/v1/Attendance/ClassAttendancePDFExport',
  exportSubjectAttendance:'schtrack-learning/api/v1/Attendance/SubjectAttendanceExport',
  exportSubjectAttendancePdf:'schtrack-learning/api/v1/Attendance/SubjectPDFAttendanceExport',
  exportParentExcel: 'schtrack-auth/api/v1/Parent/GetParentDataInExcel',
  exportParentPdf: 'schtrack-auth/api/v1/Parent/GetParentDataInPDF',
  exportSingleStudentAttendanceForClassPdf:'schtrack-learning/api/v1/Attendance/ExportSingleStudentAttendanceForClassPDF',
  exportSingleStudentAttendanceForSubjectPdf:'schtrack-learning/api/v1/Attendance/ExportSingleStudentAttendanceForSubjectPDF',
  exportSingleStudentAttendanceForClassExcel:'schtrack-learning/api/v1/Attendance/ExportSingleStudentAttendanceForClassExcel',
  exportSingleStudentAttendanceForSubjectExcel:'schtrack-learning/api/v1/Attendance/ExportSingleStudentAttendanceForSubjectExcel',
  // exportParentExcel: 'schtrack-auth/api/v1/Parent/GetParentDataInExcel',
  exportInvoiceReportExcel: 'schtrack-auth/api/v1/School/InvoiceExcelReport',
  exportInvoiceReportPdf: 'schtrack-auth/api/v1/School/InvoicePdfReport',
  getSchoolInvoiceReportView: 'schtrack-auth/api/v1/School/GetSchoolInvoiceReportView',
  
};

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }


  getStudentAttendanceSummary(studentId?, classId?){
    const url = `${this.baseUrl + routes.getStudentAttendanceSummary}?studentId=${studentId}&classId=${classId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  getStudentAttendanceForClass(StudentId?,StudentUserId?, ClassId?, FromDate?, ToDate?){
    const url = `${this.baseUrl + routes.getStudentClassAttendance}?StudentId=${StudentId}&StudentUserId=${StudentUserId}&ClassId=${ClassId}&FromDate=${FromDate}&ToDate=${ToDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  getStudentAttendanceForSubject(studentId?,studentUserId?,subjectId?, date?){
    const url = `${this.baseUrl + routes.getStudentSubjectAttendance}?studentId=${studentId}&studentUserId=${studentUserId}&subjectId=${subjectId}&date=${date}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  GetClassAttendanceWithDateSummary(TenantId, classId?, startDate?, endDate?) {
    const url = `${this.baseUrl + routes.getClassAttendanceWithDateSummary}?tenantId=${TenantId}&classId=${classId}&AttendanceStartDate=${startDate}&AttendanceEndDate=${endDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getClassSubjectAttendanceWithDateSummary(TenantId,subjectId?, startDate?, endDate?) {
    const url = `${this.baseUrl + routes.getClassSubjectAttendanceWithDateSummary}?tenantId=${TenantId}&subjectId=${subjectId}&AttendanceStartDate=${startDate}&AttendanceEndDate=${endDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  exportAttance(TenantId, classId?, startDate?, endDate?) {
    const url = `${this.baseUrl + routes.exportAttendance}?tenantId=${TenantId}&classId=${classId}&AttendanceStartDate=${startDate}&AttendanceEndDate=${endDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  exportSubjectAttendance(TenantId,subjectId?, startDate?, endDate?) {
    const url = `${this.baseUrl + routes.exportSubjectAttendance}?tenantId=${TenantId}&subjectId=${subjectId}&AttendanceStartDate=${startDate}&AttendanceEndDate=${endDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  exportAttendancePdf(TenantId, classId?, startDate?, endDate?) {
    const url = `${this.baseUrl + routes.exportAttendancePdf}?tenantId=${TenantId}&classId=${classId}&AttendanceStartDate=${startDate}&AttendanceEndDate=${endDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  exportSubjectAttendancePdf(TenantId,subjectId?, startDate?, endDate?){
    const url = `${this.baseUrl + routes.exportSubjectAttendancePdf}?tenantId=${TenantId}&subjectId=${subjectId}&AttendanceStartDate=${startDate}&AttendanceEndDate=${endDate}`;
      return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
    
  }

  exportParentExcelSheet(schoolId) {
    const url = `${this.baseUrl + routes.exportParentExcel}?schoolId=${schoolId}`; 
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } }); 
  }

  exportParentPdf(schoolId) {
    const url = `${this.baseUrl + routes.exportParentPdf}?schoolId=${schoolId}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  // invoice endpoints
  getSchoolInvoiceReportView(invoiceStatus) {
    const url = `${this.baseUrl + routes.getSchoolInvoiceReportView}/${invoiceStatus}`;
    return this.http.get(url, { headers: {Authorization: 'Bearer ' + localStorage.getItem('access_token')}} )
  }
  exportInvoiceReportExcel(invoiceStatus){
    const url = `${this.baseUrl + routes.exportInvoiceReportExcel}?invoiceStatus=${invoiceStatus}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  exportInvoiceReportPdf(invoiceStatus){
    const url = `${this.baseUrl + routes.exportInvoiceReportPdf}?invoiceStatus=${invoiceStatus}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  exportSingleStudentAttendanceByClassExcel(StudentId?,StudentUserId?, ClassId?, FromDate?, ToDate?){
    const url =`${this.baseUrl + routes.exportSingleStudentAttendanceForClassExcel}?StudentId=${StudentId}&StudentUserId=${StudentUserId}&ClassId=${ClassId}&FromDate=${FromDate}&ToDate=${ToDate}`;
    return this.http.get(url,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
  }
  exportSingleStudentAttendanceByClassPdf(StudentId?,StudentUserId?, ClassId?, FromDate?, ToDate?){
    const url =`${this.baseUrl + routes.exportSingleStudentAttendanceForClassPdf}?StudentId=${StudentId}&StudentUserId=${StudentUserId}&ClassId=${ClassId}&FromDate=${FromDate}&ToDate=${ToDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
  }
  exportSingleStudentAttendanceBySubjectExcel(studentId?,studentUserId?,subjectId?, date?){
    const url =`${this.baseUrl + routes.exportSingleStudentAttendanceForSubjectExcel}?studentId=${studentId}&studentUserId=${studentUserId}&subjectId=${subjectId}&date=${date}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
  }
  exportSingleStudentAttendanceBySubjectPdf(studentId?,studentUserId?,subjectId?, date?){
    const url =`${this.baseUrl + routes.exportSingleStudentAttendanceForSubjectPdf}?studentId=${studentId}&studentUserId=${studentUserId}&subjectId=${subjectId}&date=${date}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } })
  }
  
}
