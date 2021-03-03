import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const routes = {
  addAssignment: 'schtrack-learning/api/v1/Assignment/UploadAssignment',
  getAttendanceForClass: 'schtrack-learning/api/v1/Attendance/GetStudentAttendanceForClass',

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
}
