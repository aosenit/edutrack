import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addAssignment: 'schtrack-learning/api/v1/Assignment/UploadAssignment',
  getAttendanceForClass: 'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForClass',
  uploadsubjectAttendance: 'schtrack-learning/api/v1/Attendance/UploadSubjectAttendance',
  getsubjectAttendance: 'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForSubject',
  uploadclassAttendance: 'schtrack-learning/api/v1/Attendance/UploadClassAttendance',
  getclassAttendance: 'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForClass',

};

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;

  constructor(private http: HttpClient) { }

  getAssignmentByTeacher() {
    const url = `${this.baseUrl + routes.getAttendanceForClass}`;
    console.log(url);
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });

  }

  createSubjectAttendance(attendanceData) {
    const url = `${this.baseUrl + routes.uploadsubjectAttendance}`;
    return this.http.post(url, attendanceData,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getSubjectAttendance(SubjectId ) {
    const url = `${this.baseUrl + routes.getsubjectAttendance}?SubjectId=${SubjectId }`;
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  createClassAttendance(attendanceData) {
    const url = `${this.baseUrl + routes.uploadclassAttendance}`;
    return this.http.post(url, attendanceData,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }

  getClassAttendance(SubjectId ) {
    const url = `${this.baseUrl + routes.getclassAttendance}?SubjectId=${SubjectId }`;
    return this.http.get(url,  { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
}
