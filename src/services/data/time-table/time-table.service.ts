import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addTimeTable: 'schtrack-learning/api/v1/TimeTable/UploadNewTimetableForClass ',
  uploadPeriod : 'schtrack-learning/api/v1/TimeTable/UploadPeriod',
  getPeriods : 'schtrack-learning/api/v1/TimeTable/GetPeriods',
  addTimeTableCell: 'schtrack-learning/api/v1/TimeTable/AddNewTimetableCell',
  getTableforteacher: 'schtrack-learning/api/v1/TimeTable/GetTimetableForTeacher',
  getTableforTeacherByDay: 'schtrack-learning/api/v1/TimeTable/GetAllClassesForTeacherByDay',
  getTableforClass: 'schtrack-learning/api/v1/TimeTable/GetTimetableForClass',
  getNextClassesforTeacherByDay: 'schtrack-learning/api/v1/TimeTable/GetNextClassesForTeacherByDay',
  deleteTableforClass: 'schtrack-learning/api/v1/TimeTable/DeleteTimetableCell',
};

@Injectable({
  providedIn: 'root'
})
export class TimeTableService {
  baseUrl: string = environment.serverUrl;

  constructor(private http: HttpClient) { }

  createNewTimeTable(timetableform) {
    const url = `${this.baseUrl + routes.addTimeTable}`;
    return this.http.post(url, timetableform);
  }

  createPeriod(periodForm) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.uploadPeriod}`;
    return this.http.post(url, periodForm, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getPeriods() {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getPeriods}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  AddTimeTableCell(result) {
    const tenantId = '1'; // just a temporary header till email services is ready
    const body = new FormData();
    body.append('PeriodId', result.PeriodId);
    body.append('Day', result.Day);
    body.append('TeacherClassSubjectId', result.TeacherClassSubjectId);
    body.append('HasVirtual', result.HasVirtual);
    // body.append('NoOfPeriod', result.NoOfPeriod);

    const url = `${this.baseUrl + routes.addTimeTableCell}`;
    return this.http.post(url, body, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getTimeTableForTeacher() {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getTableforteacher}/3`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getTimeTableForClass(id: any) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getTableforClass}/${id}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getAllClassesForTeacherByDay(teacherId, day) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getTableforTeacherByDay}?teacherId=${teacherId}&day=${day}`;
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }

  getNextClassessForTeacherByDay(teacherId, day) {
    const tenantId = '1'; // just a temporary header till email services is ready

    const url = `${this.baseUrl + routes.getNextClassesforTeacherByDay}?teacherId=${teacherId}&day=${day}`;
    console.log(url);
    return this.http.get(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  }


  // deleteTimeTableCell() {
  //   const tenantId = '1'; // just a temporary header till email services is ready

  //   const url = `${this.baseUrl + routes.deleteTableforClass}/15`;
  //   return this.http.delete(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('access_token'), tenantId } });
  // }

  //  all these are not yet consumed
  // getTimeTableForClass(classId) {
  //   const url = `${this.baseUrl + routes.getTableforclass}/${classId}`;
  //   return this.http.get(url);
  // }




}
