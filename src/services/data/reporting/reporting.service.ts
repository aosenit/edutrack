import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const tenantId = '1';
const routes = {
  getClassAttendanceWithDateSummary: 'schtrack-learning/api/v1/Attendance/GetClassAttendanceWithDateSummary',
  exportAttendance: 'schtrack-learning/api/v1/Attendance/AttendanceExport',

};

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  baseUrl: string = environment.serverUrl;
  baseUrl2: string = environment.demourl;


  constructor(private http: HttpClient) { }

  GetClassAttendanceWithDateSummary(TenantId, classId?, startDate?, endDate?) {
    const url = `${this.baseUrl + routes.getClassAttendanceWithDateSummary}?tenantId=${TenantId}&classId=${classId}&AttendanceStartDate=${startDate}&AttendanceEndDate=${endDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }
  exportAttance(TenantId, classId?, startDate?, endDate?) {
    const url = `${this.baseUrl + routes.exportAttendance}?tenantId=${TenantId}&classId=${classId}&AttendanceStartDate=${startDate}&AttendanceEndDate=${endDate}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token') } });
  }


}
