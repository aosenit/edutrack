import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const routes = {
  addTimeTable: '/TimeTable/UploadNewTimetableForClass ',
  uploadPeriod : 'TimeTable/UploadPeriod',
  getTableforclass: 'TimeTable/GetTimetableForTeacher/',
  getTableforteacher: 'TimeTable/GetTimetableForTeacher/',
  getclassesforteacherbyday: 'TimeTable/GetAllClassesForTeacherByDay',
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

  createTimeTablePeriod(periodForm) {
    const url = `${this.baseUrl + routes.uploadPeriod}`;
    return this.http.post(url, periodForm);
  }

  getTimeTableForClass(classId) {
    const url = `${this.baseUrl + routes.getTableforclass}/${classId}`;
    return this.http.get(url);
  }

  getTimeTableForTeacher(classId) {
    const url = `${this.baseUrl + routes.getTableforteacher}/${classId}`;
    return this.http.get(url);
  }

  getAllClassesForTeacherByDay(teacherId) {
    const url = `${this.baseUrl + routes.getclassesforteacherbyday}/${teacherId}`;
    return this.http.get(url);
  }


}
